import {
    REGISTER_ERROR,
    REGISTER_REQUEST,
    REGISTER_SUCCESS
} from './type';

const initialState = {
    loading: false,
    error: null,
    user: null,
    authenticated: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case REGISTER_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
                user: null,
                authenticated: false,
            }
        case REGISTER_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
                user: null,
                authenticated: false
            }
        case REGISTER_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                user: action.user,
                authenticated: false
            }
        default:
            return state;
    }
}

export default reducer;