// Packages
import express, {
  Express,
  NextFunction,
} from 'express';

// Local Imports
import {
  AreaRoutes,
  LocationRoutes,
  RockRoutes,
  RouteRoutes,
  SessionRoutes,
  TickRoutes,
  UserRoutes,
} from './handlers';
import { AbstractDatabase } from './database/abstract-database';
import { REQUEST_TYPE } from './config';
import { Environment } from './helpers/environment';
import { RateLimiter } from './helpers/rate-limit';
import { getDatabase } from './database';
import { Populator } from './helpers/populator';
import { Monitor } from './helpers/monitor';

// Types
import {
  ServerRequest,
  ServerResponse,
} from './types';

/**
 * Wrapper around the express server.
 */
export class Server {
  /**
   * Static reference to the database layer.
   */
  protected static _database: AbstractDatabase;

  /**
   * Static reference to the express app.
   */
  protected static _app: Express;

  /**
   * Server constructor initializes layers.
   */
  constructor() {
    if (!Server._database) {
      Server._database = getDatabase();
    }
    
    this.stop();
  }

  /**
   * Starts the server.
   * 
   * @returns {Promise<void>} Promise of the action.
   */
  async start(): Promise<void> {
    await Server._database.connect();

    AreaRoutes.apply(Server._app);
    LocationRoutes.apply(Server._app);
    RockRoutes.apply(Server._app);
    RouteRoutes.apply(Server._app);
    SessionRoutes.apply(Server._app);
    TickRoutes.apply(Server._app);
    UserRoutes.apply(Server._app);

    setInterval(
      RateLimiter.cleanUp,
      1000 * 60 * 10,
    );

    Populator.setDatabase(Server._database);
    
    Populator.run();

    Server._app.listen(
      Environment.getServerPort(),
      () => {
        Monitor.log(
          Server,
          `Server is running on port ${Environment.getServerPort()}`,
          Monitor.Layer.SUCCESS,
        );
      },
    );
  }

  /**
   * Stops the server.
   * 
   * @returns {void} Promise of the action.
   */
  stop(): void {
    Server._app = express();
    Server._app.use(express.json());
    Server._app.use(this.log);

    Server._app.use(this.options);
  }

  /**
   * Prints stuff about the response.
   *
   * @param {ServerRequest} req Incoming request.
   * @param {ServerResponse} res Outgoing response.
   * @param {NextFunction} next Next middleware for request.
   */
  async log(
    req: ServerRequest,
    res: ServerResponse,
    next: NextFunction,
  ): Promise<void> {
    try {
      const send = res.send;

      res.send = (body?: any) => {
        let codeColor = Monitor.STD_OUT_MONITOR_LAYER_NAME_FORMATING[0];
        let methodColor = Monitor.STD_OUT_MONITOR_LAYER_NAME_FORMATING[0];

        if (res.statusCode < 400) {
          codeColor = Monitor.STD_OUT_MONITOR_LAYER_NAME_FORMATING[3];
        } else if (res.statusCode < 500) {
          codeColor = Monitor.STD_OUT_MONITOR_LAYER_NAME_FORMATING[2];
        } else if (res.statusCode >= 500) {
          codeColor = Monitor.STD_OUT_MONITOR_LAYER_NAME_FORMATING[1];
        }

        if (req.method.toLowerCase() === REQUEST_TYPE.GET) {
          methodColor = Monitor.STD_OUT_MONITOR_LAYER_NAME_FORMATING[3];
        } else if (req.method.toLowerCase() === REQUEST_TYPE.POST) {
          methodColor = Monitor.STD_OUT_MONITOR_LAYER_NAME_FORMATING[4];
        } else if (req.method.toLowerCase() === REQUEST_TYPE.DELETE) {
          methodColor = Monitor.STD_OUT_MONITOR_LAYER_NAME_FORMATING[1];
        } else if (req.method.toLowerCase() === REQUEST_TYPE.PUT) {
          methodColor = Monitor.STD_OUT_MONITOR_LAYER_NAME_FORMATING[2];
        }

        Monitor.log(
          Server,
          `${codeColor}${res.statusCode}${Monitor.STD_OUT_ESCAPE_CODE_RESET}: ${methodColor}${req.method.toUpperCase()} ${req.path}${Monitor.STD_OUT_ESCAPE_CODE_RESET}`,
          Monitor.Layer.UPDATE,
        );

        res.send = send;

        return res.send(body);
      }
    } catch (error) {
      Monitor.log(
        Server,
        `${error}`,
        Monitor.Layer.WARNING,
      );
    }

    next();
  }

  /**
   * Handles the request, abstract function.
   *
   * @param {ServerRequest} req Incoming request.
   * @param {ServerResponse} res Outgoing response.
   * @param {Middleware} next Middleware.
   */
  async options(
    req: ServerRequest,
    res: ServerResponse,
    next: NextFunction,
  ): Promise<void> {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, Authorization');
    
    if ('OPTIONS' === req.method) {
      res.setHeader(
        'Access-Control-Allow-Origin',
        Environment.getOrigin(),
      );
      res.setHeader(
        'Access-Control-Allow-Credentials',
        'true',
      );
      // res.setHeader(
      //   'Access-Control-Allow-Headers',
      //   'Origin, X-Requested-With, Content-Type, Accept',
      // );
      
      res.sendStatus(200);
    } else {
      next();
    }
  }
}
