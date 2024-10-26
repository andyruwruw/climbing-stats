// Packages
import { v4 as uuidv4 } from 'uuid';
import path from 'node:path';

// Local Imports
import {
  ATTEMPT_STATUS,
  CLIMBING_ACTIVITY,
  CLIMBING_PROTECTION,
  ROCK_TYPES,
} from '../config';
import { AbstractDatabase } from '../database/abstract-database';
import { GRADING_SYSTEMS } from '../config/grades';
import { hashPassword } from './authorization';
import { Environment } from './environment';
import { CsvParser } from './csv-parser';
import { Monitor } from './monitor';

// Types
import { PartnerTracker } from '../types/users';
import { Dictionary } from '../types';

/**
 * Populates the database with some of my base data.
 */
export class Populator {
  /**
   * Static reference to the database.
   */
  protected static _database: AbstractDatabase;

  /**
   * My ID.
   */
  protected static _adminId = '';

  /**
   * Sets static reference to database.
   *
   * @param {AbstractDatabase} database Database reference.
   */
  static setDatabase(database: AbstractDatabase) {
    Populator._database = database;
  }

  /**
   * Runs the populator.
   * 
   * @returns {Promise<void>} Promise of the action.
   */
  static async run(): Promise<void> {
    try {
      if (Environment.shouldPreClearDatabase()) {
        await Populator._clear();
      }

      if (Environment.shouldUseBaseData()) {
        await Populator._populateUsers();
        await Populator._populateSessions();
        await Populator._populateTicks();
      }
    } catch (error) {
      Monitor.log(
        Populator,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }

  /**
   * Clear the database.
   */
  static async _clear(): Promise<void> {
    Monitor.log(
      Populator,
      'Clearing all existing tables.',
      Monitor.Layer.UPDATE,
    );

    try {
      const promises = [] as Promise<any>[];

      promises.push(Populator._database.areas.deleteAll());
      promises.push(Populator._database.climbingPartners.deleteAll());
      promises.push(Populator._database.locations.deleteAll());
      promises.push(Populator._database.rocks.deleteAll());
      promises.push(Populator._database.routes.deleteAll());
      promises.push(Populator._database.sessions.deleteAll());
      promises.push(Populator._database.ticks.deleteAll());
      promises.push(Populator._database.deleteAllFiles());

      if (Environment.shouldPreClearUsers()) {
        promises.push(Populator._database.tokens.deleteAll());
        promises.push(Populator._database.users.deleteAll());
      }

      await Promise.all(promises);

      Monitor.log(
        Populator,
        ' - All tables cleared',
        Monitor.Layer.SUCCESS,
      );
    } catch (error) {
      Monitor.log(
        Populator,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }

  /**
   * Populates sessions.
   * 
   * @returns {Promise<void>} Promise of action.
   */
  static async _populateSessions(): Promise<void> {
    try {
      Monitor.log(
        Populator,
        'Populating base `Sessions`',
        Monitor.Layer.UPDATE,
      );

      if (!this._adminId) {
        Monitor.log(
          Populator,
          ` - Admin user not found, abandoning adding 'Sessions'`,
          Monitor.Layer.WARNING,
        );
        return;
      }

      const csvParser = new CsvParser(path.join(
        __dirname,
        '../data/sessions.csv',
      ));

      await csvParser.read();

      const locations = {} as Dictionary<string>;
      const areas = {} as Dictionary<string>;
      const partners = {} as Dictionary<PartnerTracker>;

      for (let i = 0; i < csvParser.length(); i += 1) {
        const session = csvParser.at(i);

        if (!session
          || !('location' in session)
          || !session.date
          || session.date === -1
          || !session.start
          || session.start === -1) {
          continue;
        }

        const locationKey = session.location.replace('|', '').replace('-', '').replace(' ', '-').toLowerCase();
        let locationId;

        if (locationKey in locations) {
          locationId = locations[locationKey];
        } else {
          const existing = await this._database.locations.findOne({ name: session.location });

          if (existing) {
            locationId = existing.id;
          } else {
            locationId = await this._database.locations.insert({
              name: session.location,
              officiallyNamed: true,
              altNames: [],
              outdoors: session.outdoors || false,
              image: null,
              country: '',
              state: '',
              locale: '',
              color: '',
              address: '',
              hrefs: {},
              updated: Date.now(),
              submitted: this._adminId,
              activities: [],
              private: false,
              privateName: false,
              privateLocation: false,
              media: [],
            });
          }
          
          locations[locationKey] = locationId;
        }

        const areaIds = [];

        if ('subarea' in session) {
          for (let j = 0; j < session.subarea.length; j += 1) {
            const areaKey = `${locationId}-${session.subarea[j].replace('|', '').replace('-', '').replace(' ', '-').toLowerCase()}`;

            if (areaKey in areas) {
              continue;
            }

            const existing = await this._database.areas.findOne({
              location: locationId,
              name: session.subarea[j],
            });

            if (existing) {
              areas[areaKey] = existing.id;
              areaIds.push(existing.id);
            } else {
              const areaId = await this._database.areas.insert({
                location: locationId,
                name: session.subarea[j],
                officiallyNamed: true,
                altNames: [],
                image: null,
                hrefs: {},
                updated: Date.now(),
                submitted: this._adminId,
                activities: [],
                private: false,
                privateName: false,
                privateLocation: false,
                media: [],
              });

              areas[areaKey] = areaId;
              areaIds.push(areaId);
            }
          }
        }

        const logAsOldestSession = [] as string[];
        const sessionPartners = [] as string[];

        if ('partners' in session) {
          for (let j = 0; j < session.partners.length; j += 1) {
            const partnerKey = `${session.partners[j].replace('|', '').replace('-', '').replace(' ', '-').toLowerCase()}`;
            
            if (partnerKey in partners) {
              partners[partnerKey].hours += session.duration;
              partners[partnerKey].sessions += 1;

              if ('outdoors' in session && session.outdoors) {
                partners[partnerKey].outdoorHours += session.duration;
                partners[partnerKey].outdoorSessions += 1;
              }

              if (session.start < partners[partnerKey].oldestSessionDate) {
                partners[partnerKey].oldestSessionDate = session.start;
                logAsOldestSession.push(partnerKey);
              }

              sessionPartners.push(partners[partnerKey].id);
              continue;
            }

            const names = session.partners[j].split(' ');
            
            if (names[0] === '') {
              names.shift();
            }

            const [
              first,
              last,
            ] = names;

            const existing = await this._database.climbingPartners.findOne({
              user: this._adminId,
              first,
              last,
            });

            if (existing) {
              logAsOldestSession.push(partnerKey);
              partners[partnerKey] = {
                add: true,
                id: existing.id,
                hours: session.duration,
                outdoorHours: ('outdoors' in session && session.outdoors) ? session.duration : 0,
                sessions: 1,
                outdoorSessions: ('outdoors' in session && session.outdoors) ? 1 : 0,
                oldestSession: '',
                oldestSessionDate: session.start,
                drivenHours: 0,
              };
              sessionPartners.push(existing.id);
            } else {
              const partnerId = await this._database.climbingPartners.insert({
                user: this._adminId,
                first,
                last,
                hoursRank: -1,
                hours: 0,
                hoursBy: 0,
                outdoorHoursRank: -1,
                outdoorHours: 0,
                sessionsRank: -1,
                sessions: 0,
                outdoorSessionsRank: -1,
                outdoorSessions: 0,
                outdoorPercent: 0,
                met: '',
                metDate: -1,
                droveRank: -1,
                drove: 0,
                hide: false,
              });

              logAsOldestSession.push(partnerKey);
              partners[partnerKey] = {
                add: true,
                id: partnerId,
                hours: session.duration,
                outdoorHours: ('outdoors' in session && session.outdoors) ? session.duration : 0,
                sessions: 1,
                outdoorSessions: ('outdoors' in session && session.outdoors) ? 1 : 0,
                oldestSession: '',
                oldestSessionDate: session.start,
                drivenHours: 0,
              };

              sessionPartners.push(partnerId);
            }
          }
        }

        const sessionCarpool = [] as string[];

        if ('driving-with' in session) {
          for (let j = 0; j < session['driving-with'].length; j += 1) {
            const partnerKey = `${session['driving-with'][j].replace('|', '').replace('-', '').replace(' ', '-').toLowerCase()}`;
            
            if (partnerKey in partners) {
              partners[partnerKey].drivenHours += session.driving;
              sessionCarpool.push(partners[partnerKey].id);
              continue;
            }

            const names = session['driving-with'][j].split(' ');
            
            if (names[0] === '') {
              names.shift();
            }

            const [
              first,
              last,
            ] = names;

            const existing = await this._database.climbingPartners.findOne({
              user: this._adminId,
              first,
              last,
            });

            if (existing) {
              partners[partnerKey] = {
                add: true,
                id: existing.id,
                hours: 0,
                outdoorHours: 0,
                sessions: 0,
                outdoorSessions: 0,
                oldestSession: '',
                oldestSessionDate: -1,
                drivenHours: session.driving,
              };
              sessionCarpool.push(existing.id);
            } else {
              const partnerId = await this._database.climbingPartners.insert({
                user: this._adminId,
                first,
                last,
                hoursRank: -1,
                hours: 0,
                hoursBy: 0,
                outdoorHoursRank: -1,
                outdoorHours: 0,
                sessionsRank: -1,
                sessions: 0,
                outdoorSessionsRank: -1,
                outdoorSessions: 0,
                outdoorPercent: 0,
                met: '',
                metDate: -1,
                droveRank: -1,
                drove: 0,
                hide: false,
              });

              partners[partnerKey] = {
                add: true,
                id: existing.id,
                hours: 0,
                outdoorHours: 0,
                sessions: 0,
                outdoorSessions: 0,
                oldestSession: '',
                oldestSessionDate: -1,
                drivenHours: session.driving,
              };
              sessionCarpool.push(partnerId);
            }
          }
        }

        const sessionId = await this._database.sessions.insert({
          user: this._adminId,
          location: locationId || '',
          areas: areaIds || [],
          outdoors: session.outdoors || false,
          date: session.date || -1,
          start: session.start || -1,
          end: session.end || -1,
          duration: session.duration || 0,
          activities: ('bouldering' in session && session.bouldering) ? [ CLIMBING_ACTIVITY.BOULDER ] : [],
          description: session.notes || '',
          felt: -1,
          partners: sessionPartners || [],
          activeCal: session['act-cal'] || -1,
          totalCal: session['tot-cal'] || -1,
          heart: session['avg-h'] || -1,
          lowHeart: session['low-h'] || -1,
          highHeart: session['hi-h'] || -1,
          carpool: sessionCarpool || [],
          drive: session.driving || 0,
          media: [],
          sent: session.sent || 'Unknown',
        });

        for (let j = 0; j < logAsOldestSession.length; j += 1) {
          partners[logAsOldestSession[j]].oldestSession = sessionId;
        }
      }

      const partnerList = Object.values(partners);
      let promises = [] as Promise<any>[];

      for (let i = 0; i < partnerList.length; i += 1) {
        const partner = partnerList[i];

        const existing = await this._database.climbingPartners.findById(partner.id);

        if (!existing) {
          continue;
        }

        if (partner.add) {
          promises.push(this._database.climbingPartners.update(
            { id: partner.id },
            {
              met: existing.metDate < partner.oldestSessionDate ? existing.met : partner.oldestSession,
              metDate: existing.metDate < partner.oldestSessionDate ? existing.metDate : partner.oldestSessionDate,
              hours: existing.hours + partner.hours,
              outdoorHours: existing.outdoorHours + partner.outdoorHours,
              sessions: existing.sessions + partner.sessions,
              outdoorSessions: existing.outdoorSessions + partner.outdoorSessions,
              drove: existing.drove + partner.drivenHours,
            },
          ));
        }
      }

      await Promise.all(promises);

      promises = [];

      const allPartners = await this._database.climbingPartners.find({ user: this._adminId });
      const hours = [] as number[];
      const outdoorHours = [] as number[];
      const sessionCount = [] as number[];
      const outdoorSessions = [] as number[];
      const drove = [] as number[];

      for (let i = 0; i < allPartners.length; i += 1) {
        if (!hours.includes(allPartners[i].hours)) {
          hours.push(allPartners[i].hours);
        }
        if (!outdoorHours.includes(allPartners[i].outdoorHours)) {
          outdoorHours.push(allPartners[i].outdoorHours);
        }
        if (!sessionCount.includes(allPartners[i].sessions)) {
          sessionCount.push(allPartners[i].sessions);
        }
        if (!outdoorSessions.includes(allPartners[i].outdoorSessions)) {
          outdoorSessions.push(allPartners[i].outdoorSessions);
        }
        if (!drove.includes(allPartners[i].drove)) {
          drove.push(allPartners[i].drove);
        }
      }

      const SORT_DESCENDING = (
        a: number,
        b: number,
      ): number => {
        return b - a;
      };

      hours.sort(SORT_DESCENDING);
      outdoorHours.sort(SORT_DESCENDING);
      sessionCount.sort(SORT_DESCENDING);
      outdoorSessions.sort(SORT_DESCENDING);
      drove.sort(SORT_DESCENDING);

      for (let i = 0; i < allPartners.length; i += 1) {
        promises.push(this._database.climbingPartners.update(
          { id: allPartners[i].id },
          {
            hoursRank: hours.findIndex((element: number) => element === allPartners[i].hours),
            outdoorHoursRank: outdoorHours.findIndex((element: number) => element === allPartners[i].outdoorHours),
            sessionsRank: sessionCount.findIndex((element: number) => element === allPartners[i].sessions),
            outdoorSessionsRank: outdoorSessions.findIndex((element: number) => element === allPartners[i].outdoorSessions),
            droveRank: drove.findIndex((element: number) => element === allPartners[i].drove),
          },
        ));
      }

      await Promise.all(promises);

      Monitor.log(
        Populator,
        ` - All ${csvParser.length()} base 'Sessions' Added`,
        Monitor.Layer.SUCCESS,
      );
    } catch (error) {
      Monitor.log(
        Populator,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }

  /**
   * Populates ticks.
   * 
   * @returns {Promise<void>} Promise of action.
   */
  static async _populateTicks(): Promise<void> {
    try {
      Monitor.log(
        Populator,
        'Populating base `Ticks`',
        Monitor.Layer.UPDATE,
      );

      if (!this._adminId) {
        Monitor.log(
          Populator,
          ` - Admin user not found, abandoning adding 'Ticks'`,
          Monitor.Layer.WARNING,
        );
        return;
      }

      const csvParser = new CsvParser(path.join(
        __dirname,
        '../data/ticks.csv',
      ));

      await csvParser.read();

      const locations = {} as Dictionary<string>;
      const areas = {} as Dictionary<string>;
      const rocks = {} as Dictionary<string>;
      const routes = {} as Dictionary<string>;

      for (let i = 0; i < csvParser.length(); i += 1) {
        const tick = csvParser.at(i);

        if (!tick || !('name' in tick)) {
          continue;
        }

        let locationId = '';

        if ('location' in tick
          && tick.location.length
          && tick.location !== '-') {
          const locationKey = tick.location.replace('|', '').replace('-', '').replace(' ', '-').toLowerCase();

          if (locationKey in locations) {
            locationId = locations[locationKey];
          } else {
            const existing = await this._database.locations.findOne({ name: tick.location});
  
            if (existing) {
              locationId = existing.id;
            } else {
              locationId = await this._database.locations.insert({
                name: tick.location,
                officiallyNamed: true,
                altNames: [],
                outdoors: true,
                image: null,
                country: '',
                state: 'state' in tick ? tick.state : '',
                locale: '',
                color: '',
                address: '',
                hrefs: {},
                updated: Date.now(),
                submitted: this._adminId,
                activities: [],
                private: false,
                privateName: false,
                privateLocation: false,
                media: [],
              });
            }
            
            locations[locationKey] = locationId;
          }
        }

        let areaId = '';

        if ('area' in tick
          && tick.area.length
          && tick.area !== '-') {
          const areaKey = `${locationId}-${tick.area.replace('|', '').replace('-', '').replace(' ', '-').toLowerCase()}`;

          if (areaKey in locations) {
            areaId = locations[areaKey];
          } else {
            const existing = await this._database.areas.findOne({
              location: locationId,
              name: tick.area,
            });

            if (existing) {
              areaId = existing.id;
            } else {
              areaId = await this._database.areas.insert({
                location: locationId,
                  name: tick.area,
                  officiallyNamed: true,
                  altNames: [],
                  image: null,
                  hrefs: {},
                  updated: Date.now(),
                  submitted: this._adminId,
                  activities: [],
                  private: false,
                  privateName: false,
                  privateLocation: false,
                  media: [],
              });
            }
            
            areas[areaKey] = areaId;
          }
        }

        let rockId = '';

        if ('wall-boulder' in tick
          && tick['wall-boulder'].length
          && tick['wall-boulder'] !== '-') {
          const rockKey = `${locationId}-${areaId}-${tick['wall-boulder'].replace('|', '').replace('-', '').replace(' ', '-').toLowerCase()}}`;

          if (rockKey in rocks) {
            rockId = rocks[rockKey];
          } else {
            const existing = await this._database.rocks.findOne({
              location: locationId,
              area: areaId,
              name: tick['wall-boulder'],
            });

            if (existing) {
              rockId = existing.id;
            } else {
              rockId = await this._database.rocks.insert({
                location: locationId,
                area: areaId,
                name: tick['wall-boulder'],
                officiallyNamed: true,
                altNames: [],
                type: 'type' in tick && tick.type === 'sport' ? ROCK_TYPES.WALL : ROCK_TYPES.BOULDER,
                activities: [],
                image: null,
                hrefs: {},
                updated: Date.now(),
                submitted: this._adminId,
                private: false,
                privateName: false,
                privateLocation: false,
                media: [],
              });
            }
          }
        }

        const routeKey = `${locationId}-${areaId}-${rockId}-${tick.name.replace('|', '').replace('-', '').replace(' ', '-').toLowerCase()}}`;
        let routeId = '';

        if (routeKey in routes) {
          routeId = routes[routeKey];
        } else {
          const existing = await this._database.routes.findOne({
            location: locationId,
            area: areaId,
            rock: rockId,
            name: tick.name,
          });

          if (existing) {
            routeId = existing.id;
          } else {
            routeId = await this._database.routes.insert({
              type: 'type' in tick ? tick.type : '',
              location: locationId,
              area: areaId,
              rock: rockId,
              name: tick.name,
              officiallyNamed: true,
              altNames: [],
              image: null,
              hrefs: {},
              media: [],
              grade: {
                'andyruwruw': tick.grade,
              },
              private: false,
              privateName: false,
              privateLocation: false,
              danger: {
                'andyruwruw': tick.danger,
              },
              updated: Date.now(),
              submitted: this._adminId,
            });
          }
          
          areas[routeKey] = routeId;
        }

        await this._database.ticks.insert({
          user: this._adminId,
          route: routeId,
          type: 'type' in tick ? tick.type : '',
          status: 'status' in tick ? tick.status : ATTEMPT_STATUS.ATTEMPT,
          sent: 'sent' in tick ? !!tick.sent : false,
          protection: 'protection' in tick ? tick.protection : CLIMBING_PROTECTION.PADS,
          date: 'date' in tick ? tick.date : -1,
          description: 'notes' in tick ? tick.notes : '',
          attempts: 'a' in tick ? tick.a : 0,
          laps: 'laps' in tick ? tick.laps: 0,
          media: [],
          feature: false,
          grade: tick.grade,
        });
      }

      Monitor.log(
        Populator,
        ` - All ${csvParser.length()} base 'Ticks' Added`,
        Monitor.Layer.SUCCESS,
      );
    } catch (error) {
      Monitor.log(
        Populator,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }

  /**
   * Populates users.
   * 
   * @returns {Promise<void>} Promise of action.
   */
  static async _populateUsers(): Promise<void> {
    try {
      Monitor.log(
        Populator,
        'Populating base `Users`',
        Monitor.Layer.UPDATE,
      );

      let size = 0;
      const andrew = await Populator._database.users.findOne({ username: 'andyruwruw' });

      if (!andrew) {
        const password = `${uuidv4()}-Aa9!`;

        Populator._adminId = await Populator._database.users.insert({
          username: 'andyruwruw',
          displayName: 'Andrew Young',
          image: 'https://i.scdn.co/image/ab6775700000ee85fee7ab07898b85fb0ffb683f',
          password: await hashPassword(password),
          hrefs: {
            moutainProject: 'https://www.mountainproject.com/user/201401927/andrew-young',
            youtube: 'https://www.youtube.com/@andyruwruw',
            instagram: 'https://www.instagram.com/andrewyoungclimbing/',
          },
          age: 26,
          gender: 'man',
          locale: 'Willamette Valley',
          state: 'OR',
          country: 'United States',
          created: Date.now(),
          points: 0,
          admin: true,
          profilePrivacy: 'public',
          localePrivacy: 'public',
          agePrivacy: 'public',
          ticksPrivacy: 'public',
          sessionsPrivacy: 'public',
          partnersPrivacy: 'public',
          pyramidPrivacy: 'public',
          mapPrivacy: 'public',
          boulderingGrades: GRADING_SYSTEMS.V_SCALE,
          routeGrades: GRADING_SYSTEMS.YOSEMITE_DECIMAL_SYSTEM,
        });

        size += 1;
        Monitor.log(
          Populator,
          ` - Created you a user as 'andyruwruw' with the password '${password}'.`,
          Monitor.Layer.WARNING,
        );
      } else {
        Populator._adminId = andrew.id;
      }

      Monitor.log(
        Populator,
        ` - All ${size} base 'Users' Added`,
        Monitor.Layer.SUCCESS,
      );
    } catch (error) {
      Monitor.log(
        Populator,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }
}
