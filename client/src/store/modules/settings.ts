// Packages
import {
  ActionTree,
  GetterTree,
  Module,
  MutationTree,
} from 'vuex';

// Local Imports
import { GradingSystem } from '@/types/climbs';
import api from '../../api';

// Types
import {
  SettingsState,
  RootState,
} from '../../types/state';
import { Dictionary } from '../../types';

// Default state
const defaultState = (): SettingsState => ({
  boulderGrades: 'v-scale',

  routeGrades: 'yosemite-decimal-system',
});

// Module state
const moduleState: SettingsState = defaultState();

// Module getters
const getters: GetterTree<SettingsState, RootState> = {
  /**
   * Retrieves grading system to use for boulders.
   *
   * @param {SettingsState} state Module state.
   * @returns {GradingSystem} Grading system used for boulders.
   */
  getBoulderGradeSystem(state: SettingsState): GradingSystem {
    return state.boulderGrades;
  },

  /**
   * Retrieves grading system to use for routes.
   *
   * @param {SettingsState} state Module state.
   * @returns {GradingSystem} Grading system used for routes.
   */
  getRouteGradeSystem(state: SettingsState): GradingSystem {
    return state.routeGrades;
  },
};

// Module mutations
const mutations: MutationTree<SettingsState> = {
};

// Module actions
const actions: ActionTree<SettingsState, RootState> = {
};

// Module
const settings: Module<SettingsState, RootState> = {
  namespaced: true,
  state: moduleState,
  getters,
  mutations,
  actions,
};

export default settings;
