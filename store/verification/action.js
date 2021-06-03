import Axios from 'axios';

import {
    GENERATE_OTP_REQUEST, GENERATE_OTP_SUCCESS, GENERATE_OTP_ERROR,
    VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS, VERIFY_OTP_ERROR
} from './type';
import { updateAuthState, updateAccessToken, updateRefreshToken } from '../authentication/action';

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
    return (dispatch) => {
        dispatch(generateOTPRequest());

        Axios.post('http://localhost:8000/auth/generateOTP', { userId })
            .then(res => {
                dispatch(generateOTPSuccess(res.data.verificationId, res.data.validity));
            })
            .catch(err => {
                const error = err.response.data.error;
                dispatch(generateOTPError(error.message));
            });
    }
}

export const verifyOTP = (verificationId, OTP, callback) => {
    return (dispatch) => {
        dispatch(verifyOTPRequest());

        Axios.post('http://localhost:8000/auth/verifyOTP', { verificationId, OTP })
            .then(res => {
                console.log("success");
                dispatch(verifyOTPSuccess());
                dispatch(updateRefreshToken(res.data.refreshToken));
                dispatch(updateAccessToken(res.data.accessToken, res.data.expiresAt));
                dispatch(updateAuthState(true));
                callback();
            })
            .catch(err => {
                const error = err.response.data.error;
                dispatch(verifyOTPError(error.message));
            });
    }
}