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
import {
  LocationsState,
  RootState,
} from '../../types/state';
import {
  Dictionary,
  Location,
} from '../../types';

// Default state
const defaultState = (): LocationsState => ({
  locations: [] as Location[],

  map: {} as Dictionary<number>,
});

// Module state
const moduleState: LocationsState = defaultState();

// Module getters
const getters: GetterTree<LocationsState, RootState> = {
  /**
   * Retrieves all locations.
   *
   * @param {LocationsState} state Module state.
   * @returns {Location[]} All tracked locations.
   */
  getLocations(state: LocationsState): Location[] {
    return state.locations;
  },

  /**
   * Retrieves a map of stored locations.
   *
   * @param {LocationsState} state Module state.
   * @returns {Dictionary<number>} Map of stored locations.
   */
  getLocationMap(state: LocationsState): Dictionary<number> {
    return state.map;
  },
};

// Module mutations
const mutations: MutationTree<LocationsState> = {
  /**
   * Sets a set of locations.
   *
   * @param {LocationsState} state Module state.
   * @param {Location[]} locations Locations to set.
   */
  setLocations(
    state: LocationsState,
    locations: Location[],
  ): void {
    state.locations = locations;
  },

  /**
   * Adds a set of lcoations.
   *
   * @param {LocationsState} state Module state.
   * @param {Location[]} locations Locations to set.
   */
  addLocations(
    state: LocationsState,
    locations: Location[],
  ): void {
    for (let i = 0; i < locations.length; i += 1) {
      const location = locations[i];

      if (location) {
        if ((location as Location).id && !(((location as Location).id as string) in state.map)) {
          state.locations.push((location as Location));
          state.map[((location as Location).id as string)] = state.locations.length - 1;
        } else {
          const keys = Object.keys(location);
          let identical = true;

          for (let j = 0; j < keys.length; j += 1) {
            const existing = state.locations[state.map[((location as Location).id as string)]];

            if ((existing as Dictionary<any>)[keys[j]] !== (location as Dictionary<any>)[keys[j]]) {
              identical = false;
              break;
            }
          }

          if (!identical) {
            state.locations[state.map[((location as Location).id as string)]] = location;
          }
        }
      }
    }
  },

  /**
   * Resets the state to default.
   *
   * @param {LocationsState} state Module state.
   */
  reset(state: LocationsState): void {
    const nextState = defaultState();
    const fields = Object.keys(nextState);

    for (let i = 0; i < fields.length; i += 1) {
      state[fields[i]] = nextState[fields[i]];
    }
  },
};

// Module actions
const actions: ActionTree<LocationsState, RootState> = {
  /**
   * Retrieves a set of locations.
   *
   * @param {ActionContext<LocationsState, RootState>} context Vuex action context.
   */
  async getLocations(
    {
      state,
      commit,
    },
    { ids = [] },
  ): Promise<void> {
    try {
      const filtered = ids.filter((id: string) => (!(id in state.map)));
      const response = await api.locations.getLocations(filtered);

      if (response && response.status === 200) {
        commit(
          'addLocations',
          response.locations,
        );
      }
    } catch (error) {
      console.log(error);
    }
  },

  /**
   * Retrieves a location.
   *
   * @param {ActionContext<LocationsState, RootState>} context Vuex action context.
   * @param {string} payload.id Location unique identifier.
   */
  async getLocation(
    {
      state,
      commit,
    },
    id,
  ): Promise<Location | null> {
    if (!id) {
      return null;
    }

    if (id in state.map) {
      return state.locations[state.map[id]];
    }

    try {
      const response = await api.locations.getLocation(id);

      if (response && response.status === 200) {
        commit(
          'addLocations',
          [response.location],
        );

        return response.location as Location;
      }
    } catch (error) {
      console.log(error);
    }
    return null;
  },
};

// Module
const locations: Module<LocationsState, RootState> = {
  namespaced: true,
  state: moduleState,
  getters,
  mutations,
  actions,
};

export default locations;
