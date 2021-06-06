import {
    ADD_LOG_ERROR,ADD_LOG_REQUEST,ADD_LOG_SUCCESS,
    DELETE_LOG_ERROR,DELETE_LOG_REQUEST,DELETE_LOG_SUCCESS,
    FETCH_LOGS_ERROR,FETCH_LOGS_REQUEST,UPDATE_LOG_SUCCESS,
    FETCH_LOGS_SUCCESS,UPDATE_LOG_REQUEST,UPDATE_LOG_ERROR
} from './type';

const initialState = {
    logs: null,
    loading: false,
    error: null
}

const reducer = (state = initialState, action) => {
    switch(action.type){
        case FETCH_LOGS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case FETCH_LOGS_SUCCESS:
            return {
                ...state,
                logs: action.logs,
                loading: false,
            }
        case FETCH_LOGS_ERROR:
            return {
                ...state,
                error: action.error,
                loading: false,
            }
        default:
            return state
    }
}

export default reducer;