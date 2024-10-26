// Packages
import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex';

// Local Imports
import {
  PAGE_SIZE,
  RETRIEVAL_STATUS,
} from '../../config';
import api from '../../api';

// Types
import {
  SessionsState,
  RootState,
  RetrievalStatus,
} from '../../types/state';
import {
  Session,
  SessionSummations,
} from '../../types';

// Default state
const defaultState = (): SessionsState => ({
  sessions: [],
  total: -1,
  start: -1,
  startSession: '',
  days: -1,
  hours: -1,
  hoursPerDay: -1,
  longestRest: -1,
  indoorHours: -1,
  indoorSessions: -1,
  outdoorHours: -1,
  outdoorSessions: -1,
  indoorPerOutdoor: -1,
  status: RETRIEVAL_STATUS.IDLE,
  error: undefined,
});

// Module state
const moduleState: SessionsState = defaultState();

// Module getters
const getters: GetterTree<SessionsState, RootState> = {
  /**
   * Retrieves the current logged in user's sessions.
   *
   * @param {SessionsState} state Module state.
   * @returns {Session[]} Current logged in user's sessions.
   */
  getSessions(state: SessionsState): Session[] {
    return state.sessions;
  },

  /**
   * Gets current logged in user's tick summations.
   *
   * @param {SessionsState} state Module state.
   * @returns {SessionSummations} Summations.
   */
  getSessionSummations: (state: SessionsState): SessionSummations => ({
    sessions: state.total,
    start: state.start,
    startSession: state.startSession,
    days: state.days,
    hours: state.hours,
    hoursPerDay: state.hoursPerDay,
    longestRest: state.longestRest,
    indoorHours: state.indoorHours,
    indoorSessions: state.indoorSessions,
    outdoorHours: state.outdoorHours,
    outdoorSessions: state.outdoorSessions,
    indoorPerOutdoor: state.indoorPerOutdoor,
  }),
};

// Module mutations
const mutations: MutationTree<SessionsState> = {
  /**
   * Sets current logged in user's sessions.
   *
   * @param {SessionsState} state Module state.
   * @param {Session[]} sessions Sessions to set.
   */
  setSessions(
    state: SessionsState,
    sessions: Session[],
  ): void {
    state.sessions = sessions.sort((
      a: Session,
      b: Session,
    ): number => ((b.date + b.start) - (a.date + a.start)));
  },

  /**
   * Adds current logged in user's sessions.
   *
   * @param {SessionsState} state Module state.
   * @param {Session[]} sessions Sessions to set.
   */
  addSessions(
    state: SessionsState,
    sessions: Session[],
  ): void {
    for (let i = 0; i < sessions.length; i += 1) {
      state.sessions.push(sessions[i]);
    }

    state.sessions.sort((
      a: Session,
      b: Session,
    ): number => ((b.date + b.start) - (a.date + a.start)));
  },

  /**
   * Sets current logged in user's session summations.
   *
   * @param {SessionsState} state Module state.
   * @param {SessionSummations} summations Summations to set.
   */
  setSummations(
    state: SessionsState,
    summations: SessionSummations,
  ): void {
    state.total = summations.sessions;
    state.start = summations.start;
    state.startSession = summations.startSession;
    state.days = summations.days;
    state.hours = summations.hours;
    state.hoursPerDay = summations.hoursPerDay;
    state.longestRest = summations.longestRest;
    state.indoorHours = summations.indoorHours;
    state.indoorSessions = summations.indoorSessions;
    state.outdoorHours = summations.outdoorHours;
    state.outdoorSessions = summations.outdoorSessions;
    state.indoorPerOutdoor = summations.indoorPerOutdoor;
  },

  /**
   * Sets the current user's sessions retrieval status.
   *
   * @param {SessionsState} state Module state.
   * @param {RetrievalStatus} status Status to set.
   */
  setStatus(
    state: SessionsState,
    status: RetrievalStatus,
  ): void {
    state.status = status;
  },

  /**
   * Sets an error for user's session retrieval.
   *
   * @param {SessionsState} state Module state.
   * @param {string | undefined} [error = undefined] Error to set.
   */
  setError(
    state: SessionsState,
    error = undefined as string | undefined,
  ): void {
    state.error = error;
  },

  /**
   * Resets the state to default.
   *
   * @param {SessionsState} state Module state.
   */
  reset(state: SessionsState): void {
    const nextState = defaultState();
    const fields = Object.keys(nextState);

    for (let i = 0; i < fields.length; i += 1) {
      state[fields[i]] = nextState[fields[i]];
    }
  },
};

// Module actions
const actions: ActionTree<SessionsState, RootState> = {
  /**
   * Retrieves user's session data.
   *
   * @param {ActionContext<SessionsState, RootState>} context Vuex action context.
   */
  async getData({
    rootGetters,
    commit,
    dispatch,
  }): Promise<void> {
    if (!rootGetters['user/isLoggedIn']) {
      commit(
        'setStatus',
        RETRIEVAL_STATUS.ERROR,
      );
      return;
    }

    try {
      dispatch(
        'sessions/getSessions',
        {},
        { root: true },
      );
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await api.sessions.getSessionSummations();

      if (response && response.status === 200) {
        commit(
          'setSummations',
          response.summations,
        );
      }
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Retrieves the current user's sessions.
   *
   * @param {ActionContext<SessionsState, RootState>} context Vuex action context.
   */
  async getSessions(
    {
      rootGetters,
      commit,
      dispatch,
    },
    {
      repeat = true,
      offset = 0,
    },
  ): Promise<void> {
    try {
      commit(
        'setStatus',
        RETRIEVAL_STATUS.LOADING,
      );

      if (!rootGetters['user/isLoggedIn']) {
        commit(
          'setStatus',
          RETRIEVAL_STATUS.ERROR,
        );
        return;
      }

      const response = await api.sessions.getSessions(
        undefined,
        undefined,
        offset,
        PAGE_SIZE,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        rootGetters['user/getUserId'],
      );

      if (response && response.status === 200) {
        const locations = (response.sessions as Session[]).map((session: Session) => (session.location));

        if (locations.length) {
          dispatch(
            'locations/getLocations',
            { ids: locations },
            { root: true },
          );
        }

        commit(
          'addSessions',
          response.sessions,
        );
        commit(
          'setStatus',
          RETRIEVAL_STATUS.SUCCESS,
        );

        if (repeat && (response.sessions as Session[]).length === PAGE_SIZE) {
          setTimeout(() => {
            dispatch(
              'sessions/getSessions',
              { offset: offset + PAGE_SIZE },
              { root: true },
            );
          }, 10);
        }
      }
    } catch (error) {
      commit(
        'setStatus',
        RETRIEVAL_STATUS.ERROR,
      );
    }
  },
};

// Module
const sessions: Module<SessionsState, RootState> = {
  namespaced: true,
  state: moduleState,
  getters,
  mutations,
  actions,
};

export default sessions;
