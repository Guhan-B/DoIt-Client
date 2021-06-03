import Axios from 'axios';

import {
    AUTH_REQUEST, AUTH_SUCCESS, AUTH_ERROR,
    UPDATE_ACCESS_TOKEN, UPDATE_REFRESH_TOKEN,
    UPDATE_AUTH_STATE
} from './type';
import { updateUser } from '../user/action';

const authRequest = () => {
    return {
        type: AUTH_REQUEST,
    }
}

const authSuccess = () => {
    return {
        type: AUTH_SUCCESS,
    }
}

const authError = (error) => {
    return {
        type: AUTH_ERROR,
        error: error,
    }
}

export const updateAccessToken = (token) => {
    return {
        type: UPDATE_ACCESS_TOKEN,
        token: token,
    }
}

export const updateRefreshToken = (token) => {
    return {
        type: UPDATE_REFRESH_TOKEN,
        token: token,
    }
}

export const updateAuthState = (state) => {
    return {
        type: UPDATE_AUTH_STATE,
        state: state
    }
}

export const register = (credentials, callback, error) => {
    return (dispatch) => {
        dispatch(authRequest());
        Axios.post('http://localhost:8000/auth/register', { ...credentials })
            .then(res => {
                const user = res.data.user;

                dispatch(updateUser(user));
                dispatch(authSuccess());

                callback();
            }).catch(e => {
                console.log(e);
                const err = e.response.data.error;
                dispatch(authError(err.message));
                error(err.message);
            })
    }
}

export const login = (credentials, callback, error) => {
    return (dispatch) => {
        dispatch(authRequest());
        Axios.post('http://localhost:8000/auth/login', { ...credentials })
            .then(res => {
                const user = res.data.user;

                dispatch(updateUser(user));

                if (res.data.verified) {
                    dispatch(updateRefreshToken(res.data.refreshToken));
                    dispatch(updateAccessToken(res.data.accessToken, res.data.expiresAt));
                    dispatch(authSuccess());
                    dispatch(updateAuthState(true));
                } else {
                    dispatch(authSuccess());
                    callback();
                }
            }).catch(e => {
                const err = e.response.data.error;
                dispatch(authError(err.message));
                error(err.message);
            })
    }
}

export const logout = (access, refresh, error) => {
    const data = { refreshToken: refresh };
    const headers = { Authorization: `Bearer ${access}` };

    return (dispatch) => {
        dispatch(authRequest());
        Axios.delete('http://localhost:8000/auth/logout', { data, headers })
            .then((res) => {
                dispatch(updateRefreshToken(null));
                dispatch(updateAccessToken(null, null));
                dispatch(updateUser(null));
                dispatch(authSuccess());
                dispatch(updateAuthState(false));
            })
            .catch((err) => {
                const error = err.response.data.error;
                dispatch(authError(error.message));
                dispatch(updateAuthState(false));
            });
    }
}
