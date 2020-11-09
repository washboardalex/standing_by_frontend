import { getToken } from './alerts.utils';
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
} from './alerts.constants';


export const getFirebaseToken = () => async (dispatch : Dispatch)  => {

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
        return token;

    } catch (error) {
        dispatch({ type: SET_FIREBASE_FAILURE, payload: error });
        console.error(error);
    }
}

export const sendFirebaseTokentoAdminServer = (token : string) => ( dispatch: Dispatch ) => {
    dispatch({ type: SET_FIREBASE_ADMIN_PENDING });
    axios({
        method: 'post',
        url: `${adminUrl}/token`,
        headers: headers,
        data: { token }
    })
    .then(function (response : AxiosResponse) {
        dispatch({ type: SET_FIREBASE_ADMIN_SUCCESS });
        console.log(response);
    })
    .catch(function (error : AxiosError) {
        dispatch({ type: SET_FIREBASE_ADMIN_FAILURE, payload: error });
        console.error(error);
    });
    
}


export const setNewAlert = () => {
    console.log('awww sheeeeit setting a new alerrt');
}

export const cancelAlert = () => {
    console.log('awww sheeeeit cancelling an alert');
}

