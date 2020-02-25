import {
    AUTH_REQUEST,
    AUTH_LOGOUT,
} from '../actions/auth';
import apiCall from '@/utils/api';

interface State {
    token: string;
    status: string;
    hasLoadedOnce: boolean;
}

const state: any = {
    token: localStorage.getItem('user-token') || '',
    status: '',
    hasLoadedOnce: false,
};

const getters: any = {
    isAuthenticated: (state: any) => !!state.token,
    authStatus: (state: any) => state.status,
};

const actions: any = {
    async authRequest({ commit, dispatch }: any, user: any) {
        return new Promise((resolve, reject) => {
            commit(AUTH_REQUEST);
            //apiCall({ url: 'auth', data: user, method: 'POST' });
            // TODO api call
        });
    },
    async authLogout({ commit }: any) {
        return new Promise((resolve) => {
            commit(AUTH_LOGOUT);
            localStorage.removeItem('user-token');
            resolve();
        });
    },
};

const mutations: any = {
    authRequest(state: any) {
        state.status = 'loading';
    },
    authSuccess(state: any, resp: any) {
        state.status = 'success';
        state.token = resp.token;
        state.hasLoadedOnce = true;
    },
    authError(state: any) {
        state.status = 'error';
        state.hasLoadedOnce = true;
    },
    authLogout(state: any) {
        state.token = '';
    },
};

export default {
    state,
    getters,
    actions,
    mutations,
};
