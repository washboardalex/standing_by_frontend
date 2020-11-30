import { headers } from '../../utils/constants';
import { Dispatch } from 'redux';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { adminUrl } from '../../utils/constants';
import {
    GET_ALERTS_PENDING,
    GET_ALERTS_FAILURE,
    GET_ALERTS_SUCCESS,
    CREATE_ALERT_PENDING,
    CREATE_ALERT_FAILURE,
    CREATE_ALERT_SUCCESS,
    DELETE_ALERT_PENDING,
    DELETE_ALERT_FAILURE,
    DELETE_ALERT_SUCCESS
} from './alerts.constants';
import { AlertCondition, AlertType, IAlert } from 'src/models/admin/IAlert';

export const getActiveAlerts = (fcmTokAdminId : number) => async (dispatch : Dispatch)  => {

    console.log("get dat id son!");
    console.log(fcmTokAdminId);

    dispatch({ type: GET_ALERTS_PENDING });
    axios({
        method: 'get',
        url: `${adminUrl}/alert/read/${fcmTokAdminId}`,
        headers: headers
    })
    .then(function (response : AxiosResponse) {
        dispatch({ type: GET_ALERTS_SUCCESS, payload: response.data });
    })
    .catch(function (error : AxiosError) {
        console.log("got an error");
        dispatch({ type: GET_ALERTS_FAILURE, payload: error });
        console.error(error);
    });
}

export const createNewAlert = (country : string, condition : AlertCondition, value : number, 
            type : AlertType, cloudMessageToken : string | null, fcmTokenId : number | null) => async (dispatch : Dispatch) => {

    const newAlert : IAlert = {
        condition,
        value,
        type,
        country
    }

    dispatch({ type: CREATE_ALERT_PENDING });

    axios({
        method: 'post',
        url: `${adminUrl}/alert/create`,
        headers: headers,
        data: { 
            newAlert,
            token: cloudMessageToken,
            tokenId: fcmTokenId
        }
    })
    .then((response : AxiosResponse) => {
        console.log('ok lets see whats going on here')
        console.log(response.data);
        console.log('');console.log('');console.log('');console.log('');console.log('');console.log('');
        dispatch({ type: CREATE_ALERT_SUCCESS, payload: response.data });
    })
    .catch((error : AxiosError) => {
        console.error(error);
        dispatch({ type: CREATE_ALERT_FAILURE, payload: error });
    });
}

export const deleteAlert = (alertId : number, fcmTokAdminId : number) => async (dispatch : Dispatch) => {
    console.log("get dat id son!");
    console.log(fcmTokAdminId, alertId);

    dispatch({ type: DELETE_ALERT_PENDING });
    axios({
        method: 'post',
        url: `${adminUrl}/alert/delete`,
        headers: headers,
        data: { 
            alertId: alertId, 
            fcmTokenId: fcmTokAdminId 
        }
    })
    .then(function (response : AxiosResponse) {
        dispatch({ type: DELETE_ALERT_SUCCESS, payload: response.data });
    })
    .catch(function (error : AxiosError) {
        console.log("got an error");
        dispatch({ type: DELETE_ALERT_FAILURE, payload: error });
        console.error(error);
    });
}

