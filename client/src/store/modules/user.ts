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

  /**
   * Whether to show login dialog.
   */
  dialog: boolean;
}

// Default state
const defaultState = (): AuthModuleState => ({
  user: null,

  dialog: false,
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
   * Toggles login dialog state.
   *
   * @param {NavigationState} state Module state.
   * @param {boolean | undefined} [dialog = true] Dialog state.
   */
  toggleDialog(
    state: AuthModuleState,
    dialog = undefined,
  ): void {
    if (dialog === undefined) {
      state.dialog = !state.dialog;
    } else {
      state.dialog = dialog;
    }
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
  /**
   * Logs a user in.
   *
   * @param {string} payload.username User's username.
   * @param {string} payload.password User's password.
   * @returns {Promise<void>} Promise of the action.
   */
  async login(
    { commit },
    {
      username,
      password,
    },
  ): Promise<void> {
    try {
      const response = await api.authentication.login(
        username,
        password,
      );

      if (response) {
        commit(
          'setUser',
          response,
        );
      }
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Registers a user.
   *
   * @param {string} payload.username User's username.
   * @param {string} payload.password User's password.
   * @returns {Promise<void>} Promise of the action.
   */
  async register(
    { commit },
    {
      fullName,
      username,
      password,
      privacy = undefined,
      email = undefined,
    },
  ): Promise<void> {
    try {
      const response = await api.authentication.register(
        fullName,
        username,
        password,
        privacy,
        email,
      );

      if (response) {
        commit(
          'setUser',
          response,
        );
      }
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Opens the login dialog.
   */
  openLoginDialog({ commit }): void {
    commit(
      'toggleDialog',
      true,
    );
  },

  /**
   * Closes the login dialog.
   */
  closeLoginDialog({ commit }): void {
    commit(
      'toggleDialog',
      false,
    );
  },
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
