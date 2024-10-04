// Packages
import Vue from 'vue';
import Vuex from 'vuex';

// Local Imports
import user from './modules/user';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
  },
});
