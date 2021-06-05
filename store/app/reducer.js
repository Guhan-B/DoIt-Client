import { APP_STARTING, APP_RUNNING } from './type';

const initialState = {
    loading: true
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case APP_STARTING:
            return {
                ...state,
                loading: true,
            }

        case APP_RUNNING:
            return {
                ...state,
                loading: false,
            }

        default:
            return state
    }
}

export default reducer;