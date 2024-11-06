// Packages
import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex';

// Local Imports
import { getToken } from '@/helpers/token';
import { RETRIEVAL_STATUS } from '../../config';
import api from '../../api';

// Types
import {
  UserState,
  RootState,
  RetrievalStatus,
} from '../../types/state';
import { User } from '../../types/user';

// Default state
const defaultState = (): UserState => ({
  user: null,
  status: RETRIEVAL_STATUS.IDLE,
  error: undefined,
  checked: false,
  admin: false,
  dialog: false,
});

// Module state
const moduleState: UserState = defaultState();

// Module getters
const getters: GetterTree<UserState, RootState> = {
  /**
   * Retrieves the current logged in user.
   *
   * @param {UserState} state Module state.
   * @returns {User | null} Current logged in user.
   */
  getUser(state: UserState): User | null {
    return state.user;
  },

  /**
   * Retrieves the current logged in user's unique identifier.
   *
   * @param {UserState} state Module state.
   * @returns {string | null} Current logged in user's unique identifier.
   */
  getUserId(state: UserState): string | null | undefined {
    return state.user ? state.user.id : null;
  },

  /**
   * Retrieves the current logged in user's username.
   *
   * @param {UserState} state Module state.
   * @returns {string | null} Current logged in user's username.
   */
  getUsername(state: UserState): string | null {
    return state.user ? state.user.username : null;
  },

  /**
   * Retrieves the current logged in user's name.
   *
   * @param {UserState} state Module state.
   * @returns {string | null} Current logged in user's name.
   */
  getDisplayName(state: UserState): string | null {
    return state.user ? state.user.displayName : null;
  },

  /**
   * Retrieves the current logged in user's image.
   *
   * @param {UserState} state Module state.
   * @returns {string | null} Current logged in user's image.
   */
  getImage(state: UserState): string | null {
    return state.user ? state.user.image : null;
  },

  /**
   * Whether a user is currently logged in.
   *
   * @param {UserState} state Module state.
   * @returns {boolean} Whether a user is logged in.
   */
  isLoggedIn(state: UserState): boolean {
    return state.user !== null;
  },

  /**
   * Whether the current user is an admin.
   *
   * @param {UserState} state Module state.
   * @returns {boolean} Whether a user is an admin
   */
  isAdmin(state: UserState): boolean {
    return state.user ? state.user.admin : state.admin;
  },
};

// Module mutations
const mutations: MutationTree<UserState> = {
  /**
   * Sets current logged in user.
   *
   * @param {UserState} state Module state.
   * @param {PublicUser | null} user User to set.
   */
  setUser(
    state: UserState,
    user: User | null,
  ): void {
    state.user = user;

    if (user) {
      state.admin = user.admin;
    } else {
      state.admin = false;
    }
  },

  /**
   * Sets the current user retrieval status.
   *
   * @param {UserState} state Module state.
   * @param {RetrievalStatus} status Status to set.
   */
  setStatus(
    state: UserState,
    status: RetrievalStatus,
  ): void {
    state.status = status;
  },

  /**
   * Sets an error for user retrieval.
   *
   * @param {UserState} state Module state.
   * @param {string | undefined} [error = undefined] Error to set.
   */
  setError(
    state: UserState,
    error = undefined as string | undefined,
  ): void {
    state.error = error;
  },

  /**
   * Sets session check status to true.
   *
   * @param {UserState} state Module state.
   */
  setChecked(state: UserState) {
    state.checked = true;
  },

  /**
   * Toggles login dialog state.
   *
   * @param {UserState} state Module state.
   * @param {boolean | undefined} [dialog = true] Dialog state.
   */
  toggleDialog(
    state: UserState,
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
   * @param {UserState} state Module state.
   */
  reset(state: UserState): void {
    const nextState = defaultState();
    const fields = Object.keys(nextState);

    for (let i = 0; i < fields.length; i += 1) {
      state[fields[i]] = nextState[fields[i]];
    }
  },
};

// Module actions
const actions: ActionTree<UserState, RootState> = {
  /**
   * Checks if a session is valid.
   *
   * @param {ActionContext<UserState, RootState>} context Vuex action context.
   */
  async checkSession({
    state,
    commit,
    dispatch,
  }): Promise<void> {
    if (state.checked) {
      return;
    }

    const token = getToken();

    if (!token) {
      commit('setChecked');
      return;
    }

    try {
      commit(
        'setStatus',
        RETRIEVAL_STATUS.LOADING,
      );
      const response = await api.users.getLoginSession();

      if (response && response.status === 200) {
        commit(
          'setUser',
          response.user,
        );
        commit(
          'setStatus',
          RETRIEVAL_STATUS.SUCCESS,
        );
        dispatch(
          'sessions/getData',
          {},
          { root: true },
        );
        dispatch(
          'ticks/getData',
          {},
          { root: true },
        );
      }
    } catch (error) {
      commit(
        'setStatus',
        RETRIEVAL_STATUS.ERROR,
      );
    }

    commit('setChecked');
  },

  /**
   * Logs a user in.
   *
   * @param {ActionContext<UserState, RootState>} context Vuex action context.
   * @param {string} payload.username User's username.
   * @param {string} payload.password User's password.
   * @returns {Promise<void>} Promise of the action.
   */
  async login(
    {
      commit,
      dispatch,
    },
    {
      username,
      password,
    },
  ): Promise<void> {
    try {
      commit(
        'setStatus',
        RETRIEVAL_STATUS.LOADING,
      );
      const response = await api.users.loginUser(
        username,
        password,
      );

      if (response && response.status === 201) {
        commit(
          'setUser',
          response.user,
        );
        commit(
          'setStatus',
          RETRIEVAL_STATUS.SUCCESS,
        );

        commit(
          'toggleDialog',
          false,
        );

        dispatch(
          'navigation/goToHome',
          {},
          { root: true },
        );
        dispatch(
          'sessions/getData',
          {},
          { root: true },
        );
        dispatch(
          'ticks/getData',
          {},
          { root: true },
        );
      } else {
        commit(
          'setStatus',
          RETRIEVAL_STATUS.ERROR,
        );
        commit(
          'setError',
          `${response.error}`,
        );
      }
    } catch (error) {
      commit(
        'setStatus',
        RETRIEVAL_STATUS.ERROR,
      );
      commit(
        'setError',
        `${error}`,
      );
    }
  },

  /**
   * Registers a user.
   *
   * @param {ActionContext<UserState, RootState>} context Vuex action context.
   * @param {string} payload.username User's username.
   * @param {string} payload.password User's password.
   * @returns {Promise<void>} Promise of the action.
   */
  async register(
    {
      commit,
      dispatch,
    },
    {
      username,
      password,
      displayName,
    },
  ): Promise<void> {
    try {
      commit(
        'setStatus',
        RETRIEVAL_STATUS.LOADING,
      );
      const response = await api.users.registerUser(
        username,
        password,
        displayName,
      );

      if (response && response.status === 201) {
        commit(
          'setUser',
          response.user,
        );
        commit(
          'setStatus',
          RETRIEVAL_STATUS.SUCCESS,
        );

        commit(
          'toggleDialog',
          false,
        );

        dispatch(
          'navigation/goToHome',
          {},
          { root: true },
        );
        dispatch(
          'sessions/getData',
          {},
          { root: true },
        );
        dispatch(
          'ticks/getData',
          {},
          { root: true },
        );
      } else {
        commit(
          'setStatus',
          RETRIEVAL_STATUS.ERROR,
        );
        commit(
          'setError',
          `${response.error}`,
        );
      }
    } catch (error) {
      commit(
        'setStatus',
        RETRIEVAL_STATUS.ERROR,
      );
      commit(
        'setError',
        `${error}`,
      );
    }
  },

  /**
   * Ends a user's session.
   *
   * @param {ActionContext<UserState, RootState>} context Vuex action context.
   * @returns {Promise<void>} Promise of the action.
   */
  async logout({ commit }): Promise<void> {
    try {
      await api.users.logoutUser();

      commit('reset');
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Opens the login dialog.
   *
   * @param {ActionContext<UserState, RootState>} context Vuex action context.
   */
  openLoginDialog({ commit }): void {
    commit(
      'toggleDialog',
      true,
    );
  },

  /**
   * Closes the login dialog.
   *
   * @param {ActionContext<UserState, RootState>} context Vuex action context.
   */
  closeLoginDialog({ commit }): void {
    commit(
      'toggleDialog',
      false,
    );
  },
};

// Module
const user: Module<UserState, RootState> = {
  namespaced: true,
  state: moduleState,
  getters,
  mutations,
  actions,
};

export default user;
