import Axios from 'axios';
import {
    ADD_LOG_ERROR, ADD_LOG_REQUEST, ADD_LOG_SUCCESS,
    DELETE_LOG_ERROR, DELETE_LOG_REQUEST, DELETE_LOG_SUCCESS,
    FETCH_LOGS_ERROR, FETCH_LOGS_REQUEST, FETCH_LOGS_SUCCESS,
    UPDATE_LOG_ERROR, UPDATE_LOG_REQUEST, UPDATE_LOG_SUCCESS
} from './type';

const fetchLogsRequest = () => {
    return {
        type: FETCH_LOGS_REQUEST,
    }
}
const fetchLogsSuccess = (logs) => {
    return {
        type: FETCH_LOGS_SUCCESS,
        logs: logs
    }
}
const fetchLogsError = () => {
    return {
        type: FETCH_LOGS_ERROR,
    }
}

const addLogRequest = () => {
    return {
        type: ADD_LOG_REQUEST,
    }
}
const addLogSuccess = (log) => {
    return {
        type: ADD_LOG_SUCCESS,
        log: log
    }
}
const addLogError = () => {
    return {
        type: ADD_LOG_ERROR,
    }
}

export const fetchLogs = (tokens, error) => {
    return async (dispatch) => {
        dispatch(fetchLogsRequest());
        try {
            const config = { headers: { Authorization: `Bearer ${tokens.access}` } };
            const res = await Axios.get('http://localhost:8000/user/me', config);
            dispatch(fetchLogsSuccess(res.data.logs));
        } catch (e) {
            console.log(e);
            const err = e.response.data.error;
            dispatch(fetchLogsError(err.message));
            error("Unable to load.Try again");
        }
    }
}

export const addLog = (tokens, log, error) => {
    return async (dispatch) => {
        dispatch(addLogRequest());
        try {
            const config = { headers: { Authorization: `Bearer ${tokens.access}` } };
            const res = await Axios.post('http://localhost:8000/log/create', {...log}, config);
        } catch (e) {
            console.log(e);
            const err = e.response.data.error;
            dispatch(addLogError(err.message));
            error("Unable to Add.Try again");
        }
    }
}