import { getToken } from './firebase.utils';
import { headers } from '../../utils/constants';
import { Dispatch } from 'redux';
import axios, { AxiosResponse, AxiosError } from 'axios';
import messaging from '@react-native-firebase/messaging';
import { adminUrl } from '../../utils/constants';
import {
    SET_FIREBASE_PENDING,
    SET_FIREBASE_FAILURE,
    SET_FIREBASE_SUCCESS,
    SET_FIREBASE_ADMIN_PENDING,
    SET_FIREBASE_ADMIN_FAILURE,
    SET_FIREBASE_ADMIN_SUCCESS
} from './firebase.constants';

export const getFirebaseToken = () => async (dispatch : Dispatch)  => {

    console.log("entering getFirebaseToken function")

    dispatch({ type: SET_FIREBASE_PENDING });
    
    try {
        const authorized = await messaging().hasPermission();
        const token = await getToken();
    
        if (authorized) {
            dispatch({ type: SET_FIREBASE_SUCCESS, payload: token });
            return token;
        }
    
        await messaging().requestPermission(); //I believe this is for ios only and thus not very important
        
        dispatch({ type: SET_FIREBASE_SUCCESS, payload: token });

        console.log("already authorized, returning token")

        return token;

    } catch (error) {
        dispatch({ type: SET_FIREBASE_FAILURE, payload: error });
        console.error(error);
    }
}

export const sendFirebaseTokentoAdminServer = (token : string, deviceId: string) => ( dispatch: Dispatch ) => {
    console.log("sending firebase token to admin server");
    console.log("tis is the endpoint, with a post request: ", `${adminUrl}/token`)
    dispatch({ type: SET_FIREBASE_ADMIN_PENDING });
    axios({
        method: 'post',
        url: `${adminUrl}/token`,
        headers: headers,
        data: { token, deviceId }
    })
    .then(function (response : AxiosResponse) {
        dispatch({ type: SET_FIREBASE_ADMIN_SUCCESS, payload: response.data.fcm_token_id });
    })
    .catch(function (error : AxiosError) {
        console.log("got an error");
        dispatch({ type: SET_FIREBASE_ADMIN_FAILURE, payload: error });
        console.error(error);
    });
    
}
