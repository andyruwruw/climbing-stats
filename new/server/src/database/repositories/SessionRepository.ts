import { BaseRepository } from '../base/BaseRepository';
import { Session, ISession } from '../models/Session';
import { ClimbingActivities } from '../models/types';

export class SessionRepository extends BaseRepository<ISession> {
  constructor() {
    super(Session);
  }

  async findByUser(userId: string, options?: { limit?: number; offset?: number }) {
    const query = { user: userId };
    const queryOptions = {
      sort: { date: -1 },
      skip: options?.offset,
      limit: options?.limit,
      populate: ['location', 'partners']
    };
    return this.find(query, queryOptions);
  }

  async findByLocation(locationId: string) {
    return this.find({ location: locationId });
  }

  async findByPartner(partnerId: string) {
    return this.find({ partners: partnerId });
  }

  async findByDateRange(userId: string, startDate: number, endDate: number) {
    return this.find({
      user: userId,
      date: { $gte: startDate, $lte: endDate }
    });
  }

  async findByActivity(userId: string, activity: ClimbingActivities) {
    return this.find({
      user: userId,
      activities: activity
    });
  }

  async getSessionStats(userId: string) {
    const sessions = await this.find({ user: userId });
    
    return {
      totalSessions: sessions.length,
      totalDuration: sessions.reduce((sum, session) => sum + session.duration, 0),
      outdoorSessions: sessions.filter(s => s.outdoors).length,
      indoorSessions: sessions.filter(s => !s.outdoors).length,
      totalDriveTime: sessions.reduce((sum, session) => sum + (session.drive || 0), 0),
      averageDuration: sessions.length > 0
        ? sessions.reduce((sum, session) => sum + session.duration, 0) / sessions.length
        : 0,
      activityBreakdown: sessions.reduce((acc, session) => {
        session.activities.forEach(activity => {
          acc[activity] = (acc[activity] || 0) + 1;
        });
        return acc;
      }, {} as Record<string, number>)
    };
  }

  async getPartnerStats(userId: string) {
    const sessions = await this.find({ user: userId });
    const partnerStats = new Map<string, {
      sessions: number;
      outdoorSessions: number;
      totalDuration: number;
      firstSession: number;
      lastSession: number;
    }>();

    sessions.forEach(session => {
      session.partners.forEach(partnerId => {
        const stats = partnerStats.get(partnerId) || {
          sessions: 0,
          outdoorSessions: 0,
          totalDuration: 0,
          firstSession: session.date,
          lastSession: session.date
        };

        stats.sessions += 1;
        if (session.outdoors) stats.outdoorSessions += 1;
        stats.totalDuration += session.duration;
        stats.firstSession = Math.min(stats.firstSession, session.date);
        stats.lastSession = Math.max(stats.lastSession, session.date);

        partnerStats.set(partnerId, stats);
      });
    });

    return Object.fromEntries(partnerStats);
  }
} 