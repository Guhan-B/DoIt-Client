import {
    GENERATE_OTP_REQUEST, GENERATE_OTP_SUCCESS, GENERATE_OTP_ERROR,
    VERIFY_OTP_REQUEST, VERIFY_OTP_SUCCESS, VERIFY_OTP_ERROR
} from './type';

const initialState = {
    loading: false,
    tip: null,
    error: null,
    verificationId: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case GENERATE_OTP_REQUEST:
            return {
                ...state,
                tip: 'Generating OTP',
                error: null,
            }
        case GENERATE_OTP_SUCCESS:
            return {
                ...state,
                tip: `OTP will be valid till ${action.validity}`,
                error: null,
                verificationId: action.verificationId
            }
        case GENERATE_OTP_ERROR:
            return {
                ...state,
                tip: 'Unable to generate OTP',
                error: action.error,
            }
        case VERIFY_OTP_REQUEST:
            return {
                ...state,
                loading: true,
                error: null,
            }
        case VERIFY_OTP_SUCCESS:
            return {
                ...state,
                loading: false,
                error: null,
                tip: "Verification success"
            }
        case VERIFY_OTP_ERROR:
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