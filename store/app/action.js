import { APP_RUNNING, APP_STARTING } from './type';
import { updateAccessToken, updateRefreshToken, updateAuthState } from '../authentication/action';
import { updateUser } from '../user/action';
import AsyncStorage from '@react-native-async-storage/async-storage';

const appStarting = () => {
    return {
        type: APP_STARTING
    };
}

const appRunning = () => {
    return {
        type: APP_RUNNING
    };
}

export const start = () => {
    return async (dispatch) => {
        console.log("Hello");
        dispatch(appStarting());
        try {
            const jsonTokens = await AsyncStorage.getItem("@tokens");
            const tokens = JSON.parse(jsonTokens);

            if (tokens && tokens.refresh) {
                const jsonUser = await AsyncStorage.getItem("@user");
                const user = JSON.parse(jsonUser);

                console.log("you can go in directly");
                console.log(user, tokens);

                const res = await Axios.post(
                    "http://localhost:8000/auth/refresh",
                    { userId: user._id },
                    { headers: { Authorization: `Bearer ${tokens.refresh}` } }
                );

                dispatch(updateRefreshToken(tokens.refresh));
                dispatch(updateAccessToken(res.data.accessToken, res.data.expiresAt));
                dispatch(updateUser(user));
                dispatch(updateAuthState(true));
                dispatch(appRunning());
            } else {
                dispatch(updateAuthState(false));
                dispatch(appRunning());
            }
        } catch (error) {
            dispatch(updateAuthState(false));
            dispatch(appRunning());
        }
    }
}