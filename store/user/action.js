import Axios from 'axios';
import { call } from 'react-native-reanimated';
import { UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_ERROR, UPDATE_USER } from './type';

export const updateUser = (user) => {
    return {
        type: UPDATE_USER,
        user: user
    }
}

const updateProfileRequest = () => {
    return {
        type: UPDATE_PROFILE_REQUEST
    }
}

const updateProfileSuccess = (name, avatar) => {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        name: name,
        avatar: avatar
    }
}

const updateProfileError = (error) => {
    return {
        type: UPDATE_PROFILE_ERROR,
        error: error
    }
}

export const updateProfile = (name, avatar, tokens, callback, error) => {
    return (dispatch) => {
        const data = {
            name,
            avatar
        };

        const config = {
            headers: {
                Authorization: `Bearer ${tokens.access}`
            }
        }

        dispatch(updateProfileRequest());
        Axios.post('http://localhost:8000/user/update', data, config)
            .then(res => {
                console.log("s");
                dispatch(updateProfileSuccess(name, avatar));
                callback();
            })
            .catch(err => {
                console.log("e");
                console.log(err);
                const error = err.response.data.error;
                dispatch(updateProfileError(error.message));
                error(error.message);
            })
    }
}