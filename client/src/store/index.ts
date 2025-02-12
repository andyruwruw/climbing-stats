// Packages
import Vue from 'vue';
import Vuex from 'vuex';

// Local Imports
import navigation from './modules/navigation';
import sessions from './modules/sessions';
import resize from './modules/resize';
import user from './modules/user';
import ticks from './modules/ticks';
import locations from './modules/locations';
import settings from './modules/settings';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    locations,
    navigation,
    resize,
    sessions,
    settings,
    ticks,
    user,
  },
});
