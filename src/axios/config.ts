/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/camelcase */
import axios, { AxiosStatic } from 'axios'
import store from '@/store'
import router from '@/router'
import { refresh } from '@/utils/request/auth'
import VueRouter from 'vue-router'
import { TokensDto } from '@/types'

const createSetAuthInterceptor = (options: any) => (config: any) => {
  const header = options.getAccessToken
  if (!!header && header !== '') {
    config.headers.Authorization = header
  } else {
    delete config.headers.Authorization
  }
  return config
}

const createUpdateAuthInterceptor = (vuex: any, http: AxiosStatic, vueRouter: VueRouter) => async (error: any) => {
  const { config, response: { status } } = error
  if (config && error.response && status === 401) {
    const tokens: TokensDto = await refresh({ access_token: vuex.getters.getAccessToken, refresh_token: vuex.getters.getRefreshToken })
    vuex.commit('setTokens', tokens)

    error.config.headers.Authorization = tokens.access_token

    return http(config)
  }

  if(status === 403) {
    vuex.commit('logout')
    vueRouter.push('/login')
    return
  }

  return Promise.reject(error)
}

const setAuthCb = createSetAuthInterceptor(store.getters)
const updateAuthCb = createUpdateAuthInterceptor(store, axios, router)

export default function axiosConfig(): void {
  axios.defaults.baseURL = process.env.VUE_APP_API_BASE_URL
  axios.defaults.timeout = process.env.VUE_APP_API_BASE_TIMEOUT

  axios.interceptors.request.use(setAuthCb)
  axios.interceptors.response.use(undefined, updateAuthCb)
}
