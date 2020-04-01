interface State {
  token: string
  status: string
  hasLoadedOnce: boolean
}

const state: any = {
  token: localStorage.getItem('user-token') || '',
  status: '',
  hasLoadedOnce: false,
}

const getters: any = {
  isAuthenticated: () => !!state.token,
  authStatus: () => state.status,
}

const actions: any = {
  async authRequest({ commit, dispatch }: any, user: any) {
    return new Promise((resolve, reject) => {
      commit('authRequest')
      // apiCall({ url: 'auth', data: user, method: 'POST' });
      // TODO api call
    })
  },
  async authLogout({ commit }: any) {
    return new Promise((resolve) => {
      commit('authRequest')
      localStorage.removeItem('user-token')
      resolve()
    })
  },
}

const mutations: any = {
  authRequest() {
    state.status = 'loading'
  },
  authSuccess(resp: any) {
    state.status = 'success'
    state.token = resp.token
    state.hasLoadedOnce = true
  },
  authError() {
    state.status = 'error'
    state.hasLoadedOnce = true
  },
  authLogout() {
    state.token = ''
  },
}

export default {
  state,
  getters,
  actions,
  mutations,
}
