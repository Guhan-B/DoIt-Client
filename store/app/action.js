import { APP_RUNNING, APP_STARTING } from './type';
import { updateAccessToken, updateRefreshToken, updateAuthState } from '../authentication/action';
import { updateUser } from '../user/action';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from 'axios';

const appStarting = () => {
    return {
        type: APP_STARTING
    };
}

const appRunning = () => {
    console.log("running");
    return {
        type: APP_RUNNING
    };
}

export const start = () => {
    return async (dispatch) => {
        dispatch(appStarting());
        try {
            const jsonTokens = await AsyncStorage.getItem("@tokens");
            const tokens = JSON.parse(jsonTokens);

            if (tokens) {
                const jsonUser = await AsyncStorage.getItem("@user");
                const user = JSON.parse(jsonUser);

                const res = await Axios.post(
                    "http://localhost:8000/auth/refresh",
                    { userId: user._id },
                    { headers: { Authorization: `Bearer ${tokens.refresh}` } }
                );
                
                dispatch(updateAuthState(true));
                dispatch(updateRefreshToken(tokens.refresh));
                dispatch(updateAccessToken(res.data.accessToken, res.data.expiresAt));
                dispatch(updateUser(user));
                dispatch(appRunning());
            } else {
                console.log("Starting");
                dispatch(updateAuthState(false));
                dispatch(appRunning());
            }
        } catch (error) {
            console.log(error);
            dispatch(updateAuthState(false));
            dispatch(appRunning());
        }
    }
}