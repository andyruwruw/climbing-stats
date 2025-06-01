import { BaseRepository } from '../base/BaseRepository';
import { Location, ILocation } from '../models/Location';
import { ClimbingActivities } from '../models/types';

export class LocationRepository extends BaseRepository<ILocation> {
  constructor() {
    super(Location);
  }

  async search(query: string) {
    return this.find({
      $text: { $search: query }
    });
  }

  async findByRegion(country: string, state?: string, locale?: string) {
    const query: any = { country };
    if (state) query.state = state;
    if (locale) query.locale = locale;
    return this.find(query);
  }

  async findByActivity(activity: ClimbingActivities) {
    return this.find({
      activities: activity
    });
  }

  async findOutdoorLocations() {
    return this.find({ outdoors: true });
  }

  async findIndoorLocations() {
    return this.find({ outdoors: false });
  }

  async findPublicLocations() {
    return this.find({
      private: false,
      privateLocation: false
    });
  }

  async updateMedia(locationId: string, mediaUrls: string[]) {
    return this.update(locationId, {
      $addToSet: { media: { $each: mediaUrls } }
    });
  }

  async updateActivities(locationId: string, activities: ClimbingActivities[]) {
    return this.update(locationId, {
      $set: { activities }
    });
  }

  async getLocationStats() {
    const [outdoorCount, indoorCount, totalLocations] = await Promise.all([
      this.model.countDocuments({ outdoors: true }),
      this.model.countDocuments({ outdoors: false }),
      this.model.countDocuments()
    ]);

    const activityDistribution = await this.model.aggregate([
      { $unwind: '$activities' },
      { $group: { _id: '$activities', count: { $sum: 1 } } }
    ]);

    return {
      outdoorCount,
      indoorCount,
      totalLocations,
      activityDistribution: activityDistribution.reduce((acc, { _id, count }) => {
        acc[_id] = count;
        return acc;
      }, {} as Record<string, number>)
    };
  }
} 