import { UPDATE_PROFILE_REQUEST, UPDATE_USER } from './type';

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

const updateProfileSuccess = (name,avatar) => {
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

export const updateProfile = (name, avatar, callback, error) => {
    return (dispatch) => {
        dispatch(updateProfileRequest);
        // TODO: Axios request here after adding backend endpoint.
        dispatch(updateProfileSuccess(name,avatar));
        callback();
    }
}