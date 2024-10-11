// Packages
import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex';

// Local Imports
import { PAGE_NAME } from '../../config';
import router from '../../router';

// Types
import {
  Dictionary,
  RouterPageName,
} from '../../types';
import {
  NavigationState,
  RootState,
} from '../../types/state';

/**
 * Navigation module.
 *
 * Controls the vue router from the store to
 * maintain some route related state.
 */

/**
 * Default state.
 *
 * @returns {NavigationState} Default state.
 */
export const defaultState = (): NavigationState => ({
  currentPage: '' as RouterPageName,

  params: {} as Dictionary<any>,
});

/**
 * Module state.
 */
const moduleState: NavigationState = defaultState();

/**
 * Module getters.
 */
const getters: GetterTree<NavigationState, RootState> = {
  /**
   * Whether the current page requires login.
   *
   * @type {boolean}
   */
  requiresLogin: (state: NavigationState): boolean => ([PAGE_NAME.HOME].includes(state.currentPage)),
};

/**
 * Module mutations.
 */
const mutations: MutationTree<NavigationState> = {
  /**
   * Sets value of current page.
   *
   * @param {NavigationState} state Module state.
   * @param {string} payload.name Page name.
   * @param {Dictionary<any>} payload.params Page params.
   */
  setCurrentPage(
    state: NavigationState,
    {
      name,
      params = {} as Dictionary<any>,
    },
  ): void {
    state.currentPage = name;
    state.params = params;
  },
};

// Module actions
const actions: ActionTree<NavigationState, RootState> = {
  /**
   * On each page change, update the current page.
   *
   * @param {ActionContext<NavigationState, RootState>} context Vuex action context.
   * @param {Dictionary<string>} payload Incoming payload.
   * @param {string} payload.name Name of the new page.
   * @param {Dictionary<any>} payload.params Page params.
   */
  handlePageLoad(
    { commit },
    payload,
  ): void {
    commit(
      'setCurrentPage',
      payload,
    );
  },

  /**
   * Checks if user is logged in, and reroutes to landing if not.
   *
   * @param {ActionContext<NavigationState, RootState>} context Vuex action context.
   */
  requiresLogin({
    rootGetters,
    dispatch,
  }): void {
    try {
      if (!rootGetters['user/isLoggedIn']) {
        router.push('/');
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to landing page.
   *
   * @param {ActionContext<NavigationState, RootState>} context Vuex action context.
   */
  goToLanding({
    dispatch,
    state,
  }): void {
    try {
      if (state.currentPage !== PAGE_NAME.LANDING) {
        router.push('/');
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to home page.
   *
   * @param {ActionContext<NavigationState, RootState>} context Vuex action context.
   */
  goToHome({
    dispatch,
    state,
  }): void {
    try {
      if (state.currentPage !== PAGE_NAME.HOME) {
        router.push('/home');
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to 404 page.
   *
   * @param {ActionContext<NavigationState, RootState>} context Vuex action context.
   */
  goTo404({
    dispatch,
    state,
  }): void {
    try {
      if (state.currentPage !== PAGE_NAME['404']) {
        router.push('/error/404');
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },

  /**
   * Routes the user to a profile page.
   *
   * @param {ActionContext<NavigationState, RootState>} context Vuex action context.
   */
  goToProfile({
    dispatch,
    state,
  }, {
    id,
  }): void {
    try {
      if (state.currentPage !== PAGE_NAME.PROFILE
        || ('id' in state.params && state.params.id !== id)) {
        router.push(`/profile/${id}`);
      }
    } catch (error) {
      dispatch('goTo404');
    }
  },
};

// Module
const navigation: Module<NavigationState, RootState> = {
  namespaced: true,
  state: moduleState,
  getters,
  mutations,
  actions,
};

export default navigation;
