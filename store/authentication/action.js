import Axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    console.log("action" ,state);
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
    return async (dispatch) => {
        dispatch(authRequest());
        try {
            const res = await Axios.post('http://localhost:8000/auth/login', { ...credentials });

            const user = res.data.user;

            dispatch(updateUser(user));

            if (res.data.verified) {
                const tokens = {
                    refresh: res.data.refreshToken,
                    access: res.data.accessToken,
                    expiresAt: res.data.expiresAt
                };
                const jsonTokens = JSON.stringify(tokens);
                const jsonUser = JSON.stringify(user);
                await AsyncStorage.setItem("@tokens", jsonTokens);
                await AsyncStorage.setItem("@user", jsonUser);

                dispatch(updateRefreshToken(res.data.refreshToken));
                dispatch(updateAccessToken(res.data.accessToken, res.data.expiresAt));
                dispatch(authSuccess());
                dispatch(updateAuthState(true));
            } else {
                dispatch(authSuccess());
                callback();
            }
        } catch (e) {
            const err = e.response.data.error;
            dispatch(authError(err.message));
            error(err.message);
        }
    }
}

export const logout = (access, refresh, error) => {
    const data = { refreshToken: refresh };
    const headers = { Authorization: `Bearer ${access}` };

    return async (dispatch) => {
        dispatch(authRequest());
        try {
            const res = await Axios.delete('http://localhost:8000/auth/logout', { data, headers });

            await AsyncStorage.removeItem("@tokens");
            await AsyncStorage.removeItem("@user");

            dispatch(updateRefreshToken(null));
            dispatch(updateAccessToken(null, null));
            dispatch(updateUser(null));
            dispatch(authSuccess());
            dispatch(updateAuthState(false));
        } catch (e) {
            const error = err.response.data.error;
            dispatch(authError(error.message));
            dispatch(updateAuthState(false));

        }
    }
}
