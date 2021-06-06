import Axios from 'axios';

import {
    GENERATE_OTP_REQUEST, GENERATE_OTP_SUCCESS, GENERATE_OTP_ERROR,
    VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS, VERIFY_OTP_ERROR
} from './type';
import { updateAuthState, updateAccessToken, updateRefreshToken } from '../authentication/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const generateOTPRequest = () => {
    return {
        type: GENERATE_OTP_REQUEST
    }
}

const generateOTPSuccess = (id, validity) => {
    return {
        type: GENERATE_OTP_SUCCESS,
        validity: validity,
        verificationId: id,
    }
}

const generateOTPError = (error) => {
    return {
        type: GENERATE_OTP_ERROR,
        error: error,
    }
}

const verifyOTPRequest = () => {
    return {
        type: VERIFY_OTP_REQUEST
    }
}

const verifyOTPSuccess = (validity) => {
    return {
        type: VERIFY_OTP_SUCCESS,
        validity: validity
    }
}

const verifyOTPError = (error) => {
    return {
        type: VERIFY_OTP_ERROR,
        error: error,
    }
}

export const generateOTP = (userId) => {
    return async (dispatch) => {
        dispatch(generateOTPRequest());
        try {
            const res = await Axios.post('http://localhost:8000/auth/generateOTP', { userId })
            dispatch(generateOTPSuccess(res.data.verificationId, res.data.validity));

        } catch (err) {
            const error = err.response.data.error;
            dispatch(generateOTPError(error.message));
        }
    }
}

export const verifyOTP = (verificationId, OTP, callback) => {
    return async (dispatch) => {
        dispatch(verifyOTPRequest());
        try {
            const res = await Axios.post('http://localhost:8000/auth/verifyOTP', { verificationId, OTP });
            const tokens = {
                refresh: res.data.refreshToken,
                access: res.data.accessToken,
                expiresAt: res.data.expiresAt
            };
            const jsonTokens = JSON.stringify(tokens);

            await AsyncStorage.setItem("@tokens", jsonTokens);

            dispatch(verifyOTPSuccess());
            dispatch(updateRefreshToken(tokens.refresh));
            dispatch(updateAccessToken(tokens.access, tokens.expiresAt));
            dispatch(updateAuthState(true));

            callback();
        } catch (err) {
            const error = err.response.data.error;
            dispatch(verifyOTPError(error.message));
        }
    }
}