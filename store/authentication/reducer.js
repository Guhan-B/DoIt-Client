import { AUTH_SUCCESS, AUTH_REQUEST, AUTH_ERROR, UPDATE_ACCESS_TOKEN, UPDATE_REFRESH_TOKEN, UPDATE_AUTH_STATE } from './type';

const initialState = {
    loading: false,
    error: null,
    tokens: {
        access: null,
        refresh: null,
        expiresAt: null,
    },
    isAuthenticated: false,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_REQUEST:
            return {
                ...state,
                loading: true,
                isAuthenticated: false,
            }

        case AUTH_SUCCESS:
            return {
                ...state,
                loading: false,
            }

        case AUTH_ERROR:
            return {
                ...state,
                loading: false,
                isAuthenticated: false,
                error: action.error
            }

        case UPDATE_REFRESH_TOKEN:
            return {
                ...state,
                tokens: {
                    ...state.tokens,
                    refresh: action.token,
                }
            }

        case UPDATE_ACCESS_TOKEN:
            return {
                ...state,
                tokens: {
                    ...state.tokens,
                    access: action.token,
                    expiresAt: action.expiresAt
                }
            }
        case UPDATE_AUTH_STATE:
            return {
                ...state,
                isAuthenticated: action.state,
            }
        default: return state
    }
}

export default reducer;
