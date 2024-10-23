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
  ClimbingActivities,
  Dictionary,
  SessionCounter,
  Tick,
  TickSummations,
  TickTracker,
} from '../../types';
import {
  TicksState,
  RootState,
  RetrievalStatus,
} from '../../types/state';

// Default state
const defaultState = (): TicksState => ({
  ticks: [],
  uniqueClimbs: -1,
  totalClimbs: -1,
  uniqueBoulder: -1,
  totalBoulders: -1,
  uniqueRoutes: -1,
  totalRoutes: -1,
  tickLists: {} as Record<ClimbingActivities, TickTracker[]>,
  routeSessions: {} as Dictionary<SessionCounter>,
});

// Module state
const moduleState: TicksState = defaultState();

// Module getters
const getters: GetterTree<TicksState, RootState> = {
  /**
   * Retrieves the current logged in user's ticks.
   *
   * @param {TicksState} state Module state.
   * @returns {Tick[]} Current logged in user's ticks.
   */
  getTicks(state: TicksState): Tick[] {
    return state.ticks;
  },

  /**
   * Gets current logged in user's tick summations.
   *
   * @param {TicksState} state Module state.
   * @returns {TickSummations} Summations.
   */
  getTickSummations: (state: TicksState): TickSummations => ({
    uniqueClimbs: state.uniqueClimbs,
    totalClimbs: state.totalClimbs,
    uniqueBoulder: state.uniqueBoulder,
    totalBoulders: state.totalBoulders,
    uniqueRoutes: state.uniqueRoutes,
    totalRoutes: state.totalRoutes,
    tickLists: state.tickLists,
    routeSessions: state.routeSessions,
  }),
};

// Module mutations
const mutations: MutationTree<TicksState> = {
  /**
   * Sets current logged in user's ticks.
   *
   * @param {TicksState} state Module state.
   * @param {Tick[]} ticks Ticks to set.
   */
  setTicks(
    state: TicksState,
    ticks: Tick[],
  ): void {
    state.ticks = ticks;
  },

  /**
   * Adds current logged in user's ticks.
   *
   * @param {TicksState} state Module state.
   * @param {Tick[]} ticks Ticks to set.
   */
  addTicks(
    state: TicksState,
    ticks: Tick[],
  ): void {
    for (let i = 0; i < ticks.length; i += 1) {
      state.ticks.push(ticks[i]);
    }
  },

  /**
   * Sets current logged in user's tick summations.
   *
   * @param {TicksState} state Module state.
   * @param {TickSummations} summations Summations to set.
   */
  setSummations(
    state: TicksState,
    summations: TickSummations,
  ): void {
    state.uniqueClimbs = summations.uniqueClimbs;
    state.totalClimbs = summations.totalClimbs;
    state.uniqueBoulder = summations.uniqueBoulder;
    state.totalBoulders = summations.totalBoulders;
    state.uniqueRoutes = summations.uniqueRoutes;
    state.totalRoutes = summations.totalRoutes;
    state.tickLists = summations.tickLists;
    state.routeSessions = summations.routeSessions;
  },

  /**
   * Sets the current user's sessions retrieval status.
   *
   * @param {TicksState} state Module state.
   * @param {RetrievalStatus} status Status to set.
   */
  setStatus(
    state: TicksState,
    status: RetrievalStatus,
  ): void {
    state.status = status;
  },

  /**
   * Sets an error for user's session retrieval.
   *
   * @param {TicksState} state Module state.
   * @param {string | undefined} [error = undefined] Error to set.
   */
  setError(
    state: TicksState,
    error = undefined as string | undefined,
  ): void {
    state.error = error;
  },

  /**
   * Resets the state to default.
   *
   * @param {TicksState} state Module state.
   */
  reset(state: TicksState): void {
    const nextState = defaultState();
    const fields = Object.keys(nextState);

    for (let i = 0; i < fields.length; i += 1) {
      state[fields[i]] = nextState[fields[i]];
    }
  },
};

// Module actions
const actions: ActionTree<TicksState, RootState> = {
  /**
   * Retrieves user's tick data.
   *
   * @param {ActionContext<TicksState, RootState>} context Vuex action context.
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
        'ticks/getTicks',
        {},
        { root: true },
      );
    } catch (error) {
      console.log(error);
    }

    try {
      const response = await api.ticks.getTickSummations();

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
   * Retrieves the current user's ticks.
   *
   * @param {ActionContext<TicksState, RootState>} context Vuex action context.
   */
  async getTicks(
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

      const response = await api.ticks.getTicks(
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        offset,
        PAGE_SIZE,
        undefined,
        undefined,
        undefined,
        undefined,
        undefined,
        rootGetters['user/getUserId'],
      );

      if (response && response.status === 200) {
        commit(
          'addTicks',
          response.ticks,
        );
        commit(
          'setStatus',
          RETRIEVAL_STATUS.SUCCESS,
        );

        if (repeat && (response.ticks as Tick[]).length === PAGE_SIZE) {
          setTimeout(() => {
            dispatch(
              'ticks/getTicks',
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
const ticks: Module<TicksState, RootState> = {
  namespaced: true,
  state: moduleState,
  getters,
  mutations,
  actions,
};

export default ticks;
