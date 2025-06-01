import { BaseRepository } from '../base/BaseRepository';
import { Tick, ITick } from '../models/Tick';
import { ClimbingActivities, AttemptStatus } from '../models/types';

export class TickRepository extends BaseRepository<ITick> {
  constructor() {
    super(Tick);
  }

  async findByUser(userId: string, options?: { limit?: number; offset?: number }) {
    const query = { user: userId };
    const queryOptions = {
      sort: { date: -1 },
      skip: options?.offset,
      limit: options?.limit
    };
    return this.find(query, queryOptions);
  }

  async findByRoute(routeId: string) {
    return this.find({ route: routeId });
  }

  async findSends(userId: string) {
    return this.find({
      user: userId,
      sent: true
    });
  }

  async findByTypeAndStatus(userId: string, type: ClimbingActivities, status: AttemptStatus) {
    return this.find({
      user: userId,
      type,
      status
    });
  }

  async findByGrade(userId: string, grade: string) {
    return this.find({
      user: userId,
      grade
    });
  }

  async countAttempts(userId: string, routeId: string): Promise<number> {
    const ticks = await this.find({ user: userId, route: routeId });
    return ticks.reduce((sum, tick) => sum + tick.attempts, 0);
  }

  async getGradeDistribution(userId: string) {
    const ticks = await this.find({ user: userId, sent: true });
    return ticks.reduce((acc, tick) => {
      acc[tick.grade] = (acc[tick.grade] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
  }
} 