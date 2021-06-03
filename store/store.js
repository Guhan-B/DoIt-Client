import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import userReducer from './user/reducer';
import authenticationReducer from './authentication/reducer';
import verificationReducer from './verification/reducer';

const rootReducer = combineReducers({
    user: userReducer,
    auth: authenticationReducer,
    verify: verificationReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;