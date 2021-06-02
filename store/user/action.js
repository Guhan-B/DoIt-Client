import axios from 'axios';

import { REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_ERROR } from './type';

const registerRequest = () => {
    return {
        type: REGISTER_REQUEST
    }
}

const registerSuccess = (user) => {
    return {
        type: REGISTER_SUCCESS,
        user: user
    }
}

const registerError = (error) => {
    return {
        type: REGISTER_ERROR,
        error: error
    }
}

export const register = (credentials) => {
    console.log(credentials);
    return (dispatch) => {
        dispatch(registerRequest());
        axios.post('http://localhost:8000/auth/register', {
            ...credentials
        }).then(res => {
            console.log("success");
            dispatch(registerSuccess(res.data.user));
        }).catch(err => {
            console.log(err);
            const error = err.response.data.error;
            dispatch(registerError(error.message));
        })
    }
}