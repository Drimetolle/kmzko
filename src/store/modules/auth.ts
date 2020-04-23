import { User, TokensDto } from '@/types/index'
import { login, refresh } from '@/utils/request/auth'

class State {
  accessToken: string = localStorage.getItem('access-token') ?? ''
  refreshToken: string = localStorage.getItem('refresh-token') ?? ''
  authenticated: boolean = !!this.accessToken && this.accessToken !== ''
}

const getters = {
  getAccessToken(state: State): string  {
    return state.accessToken
  },
  getRefreshToken(state: State): string {
    return state.refreshToken
  },
  isAuthenticated(state: State): boolean {
    return state.authenticated
  },
}

const actions = {
  async authRequest({ commit, dispatch }: any, user: User) {
    try {
      const res: TokensDto = await login(user)
      commit('setAccessToken', res.access_token)
      commit('setRefreshToken', res.refresh_token)
      commit('authenticate')
    }
    catch (error) {
      //
    }
  },
}

const mutations = {
  setAccessToken(oldState: State, token: string): void {
    oldState.accessToken = token
    localStorage.setItem('access-token', token)
  },
  setRefreshToken(oldState: State, token: string): void {
    oldState.refreshToken = token
    localStorage.setItem('refresh-token', token)
  },
  setTokens(oldState: State, tokens: TokensDto) {
    oldState.accessToken = tokens.access_token
    oldState.refreshToken = tokens.refresh_token

    localStorage.setItem('access-token', tokens.access_token)
    localStorage.setItem('refresh-token', tokens.refresh_token)
  },
  logout(oldState: State): void {
    oldState.accessToken = ''
    oldState.refreshToken = ''
    oldState.authenticated = false

    localStorage.removeItem('access-token')
    localStorage.removeItem('refresh-token')
  },
  authenticate(oldState: State) {
    oldState.authenticated = true
  },
}

export default {
  state: new State(),
  getters,
  actions,
  mutations,
}
