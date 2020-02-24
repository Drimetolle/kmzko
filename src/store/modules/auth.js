import {
    AUTH_REQUEST,
    AUTH_LOGOUT
} from '../actions/auth'
import apiCall from '@/utils/api'

const state = {
    token: localStorage.getItem('user-token') || '',
    status: '',
    hasLoadedOnce: false
}

const getters = {
    isAuthenticated: state => !!state.token,
    authStatus: state => state.status
}

const actions = {
    async authRequest ({ commit, dispatch }, user) {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST)
            apiCall({ url: 'auth', data: user, method: 'POST' })
            // TODO api call
        })
    },
    async authLogout ({ commit }) {
        return new Promise(resolve => {
            commit(AUTH_LOGOUT)
            localStorage.removeItem('user-token')
            resolve()
        })
    }
}

const mutations = {
    authRequest (state) {
        state.status = 'loading'
    },
    authSuccess (state, resp) {
        state.status = 'success'
        state.token = resp.token
        state.hasLoadedOnce = true
    },
    authError (state) {
        state.status = 'error'
        state.hasLoadedOnce = true
    },
    authLogout (state) {
        state.token = ''
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
