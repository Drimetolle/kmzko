import { User, TokensDto } from '@/types/index'
import { login, registration } from '@/utils/request/auth'

export class Auth {
  accessToken: string = localStorage.getItem('access-token') ?? ''
  refreshToken: string = localStorage.getItem('refresh-token') ?? ''
  authenticated: boolean = !!this.accessToken && this.accessToken !== ''
}

const getters = {
  getAccessToken(state: Auth): string {
    return state.accessToken
  },
  getRefreshToken(state: Auth): string {
    return state.refreshToken
  },
  isAuthenticated(state: Auth): boolean {
    return state.authenticated
  },
}

const actions = {
  async authRequest({ commit, dispatch }: any, user: User): Promise<void> {
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
  async join({ commit, dispatch }: any, user: User): Promise<void> {
    const { status } = await registration(user)

    if (status === 'ok') {
      await dispatch('authRequest', user)
      return
    }
  },
}

const mutations = {
  setAccessToken(oldState: Auth, token: string): void {
    oldState.accessToken = token
    localStorage.setItem('access-token', token)
  },
  setRefreshToken(oldState: Auth, token: string): void {
    oldState.refreshToken = token
    localStorage.setItem('refresh-token', token)
  },
  setTokens(oldState: Auth, tokens: TokensDto): void {
    oldState.accessToken = tokens.access_token
    oldState.refreshToken = tokens.refresh_token

    localStorage.setItem('access-token', tokens.access_token)
    localStorage.setItem('refresh-token', tokens.refresh_token)
  },
  logout(oldState: Auth): void {
    oldState.accessToken = ''
    oldState.refreshToken = ''
    oldState.authenticated = false

    localStorage.removeItem('access-token')
    localStorage.removeItem('refresh-token')
  },
  authenticate(oldState: Auth): void {
    oldState.authenticated = true
  },
}

export default {
  state: new Auth(),
  getters,
  actions,
  mutations,
}
