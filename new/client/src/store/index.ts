import { createStore } from 'vuex'
import { RootState } from './types'

// Store modules will be imported here
// import userModule from './modules/user'
// import sessionsModule from './modules/sessions'

export default createStore<RootState>({
  strict: process.env.NODE_ENV !== 'production',
  state: () => ({
    isLoading: false,
    error: null as string | null,
  }),
  
  getters: {
    hasError: (state) => state.error !== null,
  },
  
  mutations: {
    SET_LOADING(state, payload: boolean) {
      state.isLoading = payload
    },
    SET_ERROR(state, payload: string | null) {
      state.error = payload
    },
  },
  
  actions: {
    setLoading({ commit }, payload: boolean) {
      commit('SET_LOADING', payload)
    },
    setError({ commit }, payload: string | null) {
      commit('SET_ERROR', payload)
    },
  },
  
  modules: {
    // Modules will be registered here
    // user: userModule,
    // sessions: sessionsModule,
  }
}) 