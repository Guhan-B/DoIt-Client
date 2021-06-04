import {
    UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS, UPDATE_PROFILE_ERROR,
    UPDATE_USER
} from './type';

const initialState = {
    _id: null,
    email: null,
    name: null,
    avatar: 1,
    error: null,
    loading: false
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_USER:
            return {
                ...state,
                ...action.user
            }
        case UPDATE_PROFILE_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case UPDATE_PROFILE_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                name: action.name,
                avatar: action.avatar
            }
        case UPDATE_PROFILE_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            }

        default:
            return state
    }
}

export default reducer;