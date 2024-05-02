// // Packages
// import {
//   ActionTree,
//   GetterTree,
//   Module,
//   MutationTree,
// } from 'vuex';

// // Types
// import { User } from '../../types';

// // State interface
// export interface ProfileModuleState extends Record<string, any> {
//   /**
//    * Current logged in user.
//    */
//   user: User | null;
// };

// // Default state
// const defaultState = (): ProfileModuleState => ({
//   user: null,
// });

// // Module state
// const moduleState: ProfileModuleState = defaultState();

// // Module getters
// const getters: GetterTree<ProfileModuleState, any> = {
//   /**
//    * Retrieves the current logged in user.
//    *
//    * @param {ProfileModuleState} state Module state.
//    * @returns {User | null} Current logged in user.
//    */
//   getUser(state: ProfileModuleState): User | null {
//     return state.user;
//   },

//   /**
//    * Retrieves the current logged in user's username.
//    *
//    * @param {ProfileModuleState} state Module state.
//    * @returns {string | null} Current logged in user's username.
//    */
//   getUsername(state: ProfileModuleState): string | null {
//     return state.user ? state.user.username : null;
//   },

//   /**
//    * Retrieves the current logged in user's image.
//    *
//    * @param {ProfileModuleState} state Module state.
//    * @returns {string | null} Current logged in user's image.
//    */
//   getImage(state: ProfileModuleState): string | null {
//     return state.user ? state.user.image : null;
//   },

//   /**
//    * Whether a user is currently logged in.
//    *
//    * @param {ProfileModuleState} state Module state.
//    * @returns {boolean} Whether a user is logged in.
//    */
//   isLoggedIn(state: ProfileModuleState): boolean {
//     return state.user !== null;
//   },
// };

// // Module mutations
// const mutations: MutationTree<ProfileModuleState> = {
//   /**
//    * Sets current logged in user.
//    *
//    * @param {NavigationState} state Module state.
//    * @param {PublicUser | null} user User to set.
//    */
//   setUser(
//     state: ProfileModuleState,
//     user: User | null,
//   ): void {
//     state.user = user;
//   },

//   /**
//    * Resets the state to default.
//    *
//    * @param {NavigationState} state Module state.
//    */
//   reset(state: ProfileModuleState): void {
//     const nextState = defaultState();
//     const fields = Object.keys(nextState);

//     for (let i = 0; i < fields.length; i += 1) {
//       state[fields[i]] = nextState[fields[i]];
//     }
//   },
// };

// // Module actions
// const actions: ActionTree<ProfileModuleState, any> = {
//   /**
//    * Logs a user in with the website.
//    *
//    * @param {ActionContext<NavigationState, any>} context Vuex action context.
//    * @param {Record<string, any>} payload Action payload.
//    * @param {string} payload.username User's username.
//    * @param {string} payload.password User's password.
//    */
//   async login({
//     commit,
//     dispatch,
//   }, {
//     username,
//     password,
//   }): Promise<void> {
//     try {
//       const user = await api.authentication.login(
//         username,
//         password,
//       );

//       if (!('message' in user)) {
//         commit('setUser', user);
//         dispatch('navigation/goToHome', undefined, { root: true });
//       } else {
//         dispatch('error/logError', { error: user.message }, { root: true });
//       }
//     } catch (error) {
//       dispatch('error/logError', { error: `${error}` }, { root: true });
//     }
//   },

//   /**
//    * Registers a user in with the website.
//    *
//    * @param {ActionContext<NavigationState, any>} context Vuex action context.
//    * @param {Record<string, any>} payload Action payload.
//    */
//   async register({
//     commit,
//     dispatch,
//   }, payload): Promise<void> {
//     let response;

//     try {
//       response = await api.authentication.register(
//         payload.username,
//         payload.password,
//         payload.displayName,
//         payload.max || undefined,
//         payload.email || undefined,
//         payload.image || undefined,
//         payload.started || undefined,
//         payload.home || undefined,
//         payload.height || undefined,
//         payload.span || undefined,
//         payload.weight || undefined,
//         payload.age || undefined,
//         payload.privacy || undefined,
//         payload.attemptPrivacy || undefined,
//         payload.sessionPrivacy || undefined,
//         payload.interestPrivacy || undefined,
//         payload.reviewPrivacy || undefined,
//         payload.ratingPrivacy || undefined,
//         payload.shoesPrivacy || undefined,
//       );

//       console.log(response);

//       if ('username' in response) {
//         commit('setUser', response);
//         dispatch('navigation/goToHome', undefined, { root: true });
//       } else {
//         dispatch('error/logError', { error: response.message }, { root: true });
//       }
//     } catch (error) {
//       dispatch('error/logError', { error: `${response ? (response as ErrorResponse).message : 'Unknown error.'}` }, { root: true });
//     }
//   },

//   /**
//    * Checks if user has a current session.
//    *
//    * @param {ActionContext<NavigationState, any>} context Vuex action context.
//    */
//   async checkUser({
//     commit,
//     dispatch,
//   }): Promise<void> {
//     try {
//       const user = await api.authentication.checkUser();

//       if (user && !('message' in user)) {
//         commit('setUser', user);
//         dispatch('navigation/goToHome', undefined, { root: true });
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   },

//   /**
//    * Logs a user out and clears state.
//    *
//    * @param {ActionContext<NavigationState, any>} context Vuex action context.
//    */
//   logout({
//     commit,
//     dispatch,
//   }): void {
//     commit('reset');
//     dispatch('navigation/goToLanding', undefined, { root: true });
//     api.authentication.logout();
//   },
// };

// // Module
// const user: Module<ProfileModuleState, Record<string, any>> = {
//   namespaced: true,
//   state: moduleState,
//   getters,
//   mutations,
//   actions,
// };

// export default user;
