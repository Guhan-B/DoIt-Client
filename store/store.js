import { createStore, combineReducers, applyMiddleware } from "redux";
import logger from 'redux-logger';
import thunk from 'redux-thunk';

import userReducer from './user/reducer';

const rootReducer = combineReducers({
    user: userReducer
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;