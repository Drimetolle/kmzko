import {
    AUTH_REQUEST,
    AUTH_ERROR,
    AUTH_SUCCESS,
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
    [AUTH_REQUEST]: ({ commit, dispatch }, user) => {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST)
            apiCall({ url: 'auth', data: user, method: 'POST' })
            // TODO api call
        })
    },
    [AUTH_LOGOUT]: ({ commit }) => {
        return new Promise(resolve => {
            commit(AUTH_LOGOUT)
            localStorage.removeItem('user-token')
            resolve()
        })
    }
}

const mutations = {
    [AUTH_REQUEST]: state => {
        state.status = 'loading'
    },
    [AUTH_SUCCESS]: (state, resp) => {
        state.status = 'success'
        state.token = resp.token
        state.hasLoadedOnce = true
    },
    [AUTH_ERROR]: state => {
        state.status = 'error'
        state.hasLoadedOnce = true
    },
    [AUTH_LOGOUT]: state => {
        state.token = ''
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
