import { headers } from '../../utils/constants';
import { AnyAction, Dispatch } from 'redux';
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
    DELETE_ALERT_SUCCESS,
    RESET_CREATE_ALERT_FLOW,
    RESET_DELETE_ALERT_FLOW
} from './alerts.constants';
import { AlertCondition, AlertType, IAlert } from '../../models/admin/IAlert';
import { AlertFlow } from './alerts.reducer';

export const getActiveAlerts = (fcmTokAdminId : number) => async (dispatch : Dispatch)  => {

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
        dispatch({ type: GET_ALERTS_FAILURE, payload: error });
        console.error(error);
    });
}

export const createNewAlert = (country : string, condition : AlertCondition, value : number, 
            type : AlertType, cloudMessageToken : string | null, fcmTokenId : number | null, countrySlug : string) => async (dispatch : Dispatch) => {

    const newAlert : IAlert = {
        condition,
        value,
        countrySlug,
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
        dispatch({ type: CREATE_ALERT_SUCCESS, payload: response.data });
    })
    .catch((error : AxiosError) => {
        console.error(error);
        dispatch({ type: CREATE_ALERT_FAILURE, payload: error });
    });
}

export const deleteAlert = (alertId : number, fcmTokAdminId : number) => async (dispatch : Dispatch) => {

    dispatch({ type: DELETE_ALERT_PENDING, payload: alertId });
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
        dispatch({ type: DELETE_ALERT_FAILURE, payload: error });
        console.error(error);
    });
}

export const resetCreateAlertFlow = () : AnyAction => ({
    type: RESET_CREATE_ALERT_FLOW,
    payload: 'pre' as AlertFlow
}); 

export const resetDeleteAlertFlow = () : AnyAction => ({
    type: RESET_DELETE_ALERT_FLOW,
    payload: 'pre' as AlertFlow
}); 


