// Packages
import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex';

// Local Imports
import { VIEWPORT_BREAKPOINTS } from '../../config';

// Types
import {
  ResizeState,
  RootState,
} from '../../types/state';

/**
 * Resize module.
 *
 * Handles resizing and keeping track of viewport.
 */

/**
 * Default state.
 *
 * @returns {ResizeState} Default state.
 */
export const defaultState = (): ResizeState => ({
  width: 0,
});

/**
 * Module state.
 */
const moduleState: ResizeState = defaultState();

/**
 * Module getters.
 */
const getters: GetterTree<ResizeState, RootState> = {
  /**
   * Whether screen size is small.
   *
   * @type {boolean}
   */
  isSmall: (state: ResizeState): boolean => (state.width < VIEWPORT_BREAKPOINTS.SMALL),

  /**
   * Whether screen size is medium.
   *
   * @type {boolean}
   */
  isMedium: (state: ResizeState): boolean => (state.width >= VIEWPORT_BREAKPOINTS.SMALL && state.width < VIEWPORT_BREAKPOINTS.MEDIUM),

  /**
   * Whether screen size is large.
   *
   * @type {boolean}
   */
  isLarge: (state: ResizeState): boolean => (state.width >= VIEWPORT_BREAKPOINTS.MEDIUM && state.width < VIEWPORT_BREAKPOINTS.LARGE),

  /**
   * Whether screen size is huge.
   *
   * @type {boolean}
   */
  isHuge: (state: ResizeState): boolean => (state.width >= VIEWPORT_BREAKPOINTS.LARGE),

  /**
   * Retrieves scren size.
   *
   * @type {number}
   */
  getWidth: (state: ResizeState): number => (state.width),
};

/**
 * Module mutations.
 */
const mutations: MutationTree<ResizeState> = {
  /**
   * Sets window width.
   *
   * @param {ResizeState} state Module state.
   * @param {number} width New width.
   */
  setWidth(
    state: ResizeState,
    width: number,
  ): void {
    state.width = width;
  },
};

/**
 * Module actions.
 */
const actions: ActionTree<ResizeState, RootState> = {
  /**
   * Changes screen width.
   *
   * @param {ActionContext<ResizeState, RootState>} context Vuex action context.
   * @param {string} payload.width New width.
   */
  resize(
    { commit },
    { width },
  ): void {
    commit(
      'setWidth',
      width,
    );
  },
};

/**
 * Vuex Module
 */
const module: Module<ResizeState, RootState> = {
  namespaced: true,
  state: moduleState,
  getters,
  mutations,
  actions,
};

export default module;
