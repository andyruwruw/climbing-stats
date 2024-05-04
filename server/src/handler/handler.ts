/* eslint @typescript-eslint/no-unused-vars: "off" */
// Local Imports
import { MESSAGE_DATABASE_CONNECTION_SUCCESS } from '../config/messages';
import { getDatabase } from '../database';
import { Database } from '../database/database';
import { Monitor } from '../helpers/monitor';
import UsedAbstractHandlerError from '../errors/used-abstract-handler-error';

// Types
import {
  ServerRequest,
  ServerResponse,
} from '../types';
import {
  Area,
  ClimbingActivities,
  ClimbingPartner,
  Crag,
  Rock,
  Route,
  Session,
  User,
} from '../types/tables';

/**
 * Abstract handler class.
 */
export class Handler {
  /**
   * Database instance.
   */
  static database: Database;

  /**
   * Whether the handler is ready to execute.
   */
  _ready = false;

  /**
   * Handles the request.
   *
   * @param {ServerRequest} req Incoming request.
   * @param {ServerResponse} res Outgoing response.
   */
  async execute(
    req: ServerRequest,
    res: ServerResponse,
    id: string = '',
  ): Promise<void> {
    throw new UsedAbstractHandlerError();
  }

  /**
   * Connects to the database.
   */
  async connectDatabase(): Promise<void> {
    if (!Handler.database) {
      Handler.database = getDatabase();
    }

    try {
      if (!Handler.database.isConnected()) {
        await Handler.database.connect();

        Monitor.log(
          Handler,
          MESSAGE_DATABASE_CONNECTION_SUCCESS,
          Monitor.Layer.INFO,
        );
      }

      this._ready = true;
    } catch (error) {
      Monitor.trace(
        Handler,
        `Failed to connect to database: ${error}`,
        Monitor.Layer.WARNING,
      );
    }
  }

  /**
   * Hides relevant data for crags.
   */
  static applyCragPrivacy(
    crag: Crag,
    user: User,
  ) {
    const censored = { ...crag };

    if (!user.admin && crag.submitted !== user.username) {
      if (crag.private) {
        censored.image = '';
        censored.activities = [] as ClimbingActivities[];
        censored.media = [];
      }
      if (crag.privateName || crag.private) {
        censored.name = 'Private';
        censored.altNames = [];
      }
      if (crag.privateLocation || crag.private) {
        censored.locale = '';
        censored.address = '';
        censored.hrefs = {};
      }
    }
  }

  /**
   * Hides relevant data for areas.
   */
  static applyAreaPrivacy(
    area: Area,
    user: User,
  ) {
    const censored = { ...area };

    if (!user.admin && area.submitted !== user.username) {
      if (area.private) {
        censored.image = '';
        censored.hrefs = {};
        censored.activities = [] as ClimbingActivities[];
        censored.media = [];
      }
      if (area.privateName || area.private) {
        censored.name = 'Private';
        censored.altNames = [];
      }
    }
  }

  /**
   * Hides relevant data for rocks.
   */
  static applyRockPrivacy(
    rock: Rock,
    user: User,
  ) {
    const censored = { ...rock };

    if (!user.admin && rock.submitted !== user.username) {
      if (rock.private) {
        censored.type = '';
        censored.image = '';
        censored.hrefs = {};
        censored.activities = [] as ClimbingActivities[];
        censored.media = [];
      }
      if (rock.privateName || rock.private) {
        censored.name = 'Private';
        censored.altNames = [];
      }
    }
  }

  /**
   * Hides relevant data for routes.
   */
  static applyRoutePrivacy(
    route: Route,
    user: User,
  ) {
    const censored = { ...route };

    if (!user.admin && route.submitted !== user.username) {
      if (route.private) {
        censored.type = '';
        censored.image = '';
        censored.hrefs = {};
        censored.media = [];
        censored.danger = '';
        censored.grade = {};
      }
      if (route.privateName || route.private) {
        censored.name = 'Private';
        censored.altNames = [];
      }
    }
  }

  /**
   * Hides relevant data for climbing partners.
   */
  static applyPartnerPrivacy(
    partner: ClimbingPartner,
    user: User,
  ) {
    const censored = { ...partner };

    if (!user.admin && partner.user !== user.username) {
      if (partner.private) {
        censored.hours = -1;
        censored.sessions = -1;
        censored.outdoorHours = -1;
        censored.outdoorSessions = -1;
        censored.met = '';
        censored.next = '';
      }
      if (partner.privateName || partner.private) {
        censored.firstName = 'Private';
        censored.lastName = '';
      }
    }
  }

  /**
   * Hides relevant data for sessions.
   */
  static applySessionPrivacy(
    session: Session,
    user: User,
  ) {
    const censored = { ...session };

    if (!user.admin && session.user !== user.username) {
      if (session.private) {
        censored.date = -1;
        censored.duration = -1;
        censored.activities = [];
        censored.next = '';
        censored.last = '';
        censored.media = [];
      }
      if (session.privatePartners || session.private) {
        censored.partners = session.partners.map((partner: string) => 'Logged Partner');
      }
      if (session.privateCrag || session.private) {
        censored.crag = '';
      }
      if (session.privateDetails || session.private) {
        censored.areas = [];
        censored.start = -1,
        censored.end = -1,
        censored.felt = -1;
        censored.max = [];
        censored.description = '';
      }
    }
  }
}
