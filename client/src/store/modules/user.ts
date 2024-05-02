// Packages
import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex';

// Local Imports
import api from '../../api';

// Types
import { User } from '../../types';

// State interface
export interface AuthModuleState extends Record<string, any> {
  /**
   * Current logged in user.
   */
  user: User | null;
}

// Default state
const defaultState = (): AuthModuleState => ({
  user: null,
});

// Module state
const moduleState: AuthModuleState = defaultState();

// Module getters
const getters: GetterTree<AuthModuleState, any> = {
  /**
   * Retrieves the current logged in user.
   *
   * @param {AuthModuleState} state Module state.
   * @returns {User | null} Current logged in user.
   */
  getUser(state: AuthModuleState): User | null {
    return state.user;
  },

  /**
   * Retrieves the current logged in user's username.
   *
   * @param {AuthModuleState} state Module state.
   * @returns {string | null} Current logged in user's username.
   */
  getUsername(state: AuthModuleState): string | null {
    return state.user ? state.user.username : null;
  },

  /**
   * Retrieves the current logged in user's image.
   *
   * @param {AuthModuleState} state Module state.
   * @returns {string | null} Current logged in user's image.
   */
  getImage(state: AuthModuleState): string | null {
    return state.user ? state.user.image : null;
  },

  /**
   * Whether a user is currently logged in.
   *
   * @param {AuthModuleState} state Module state.
   * @returns {boolean} Whether a user is logged in.
   */
  isLoggedIn(state: AuthModuleState): boolean {
    return state.user !== null;
  },
};

// Module mutations
const mutations: MutationTree<AuthModuleState> = {
  /**
   * Sets current logged in user.
   *
   * @param {NavigationState} state Module state.
   * @param {PublicUser | null} user User to set.
   */
  setUser(
    state: AuthModuleState,
    user: User | null,
  ): void {
    state.user = user;
  },

  /**
   * Resets the state to default.
   *
   * @param {NavigationState} state Module state.
   */
  reset(state: AuthModuleState): void {
    const nextState = defaultState();
    const fields = Object.keys(nextState);

    for (let i = 0; i < fields.length; i += 1) {
      state[fields[i]] = nextState[fields[i]];
    }
  },
};

// Module actions
const actions: ActionTree<AuthModuleState, any> = {
};

// Module
const user: Module<AuthModuleState, Record<string, any>> = {
  namespaced: true,
  state: moduleState,
  getters,
  mutations,
  actions,
};

export default user;
