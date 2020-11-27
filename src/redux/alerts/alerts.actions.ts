import { headers } from '../../utils/constants';
import { Dispatch } from 'redux';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { adminUrl } from '../../utils/constants';
import {
    GET_ALERTS_PENDING,
    GET_ALERTS_FAILURE,
    GET_ALERTS_SUCCESS
} from './alerts.constants';

export const getActiveAlerts = (fcmTokAdminId : number) => async (dispatch : Dispatch)  => {

    console.log("get dat id son!");
    console.log(fcmTokAdminId);

    dispatch({ type: GET_ALERTS_PENDING });
    axios({
        method: 'get',
        url: `${adminUrl}/alert/${fcmTokAdminId}`,
        headers: headers,
        data: { fcmTokAdminId }
    })
    .then(function (response : AxiosResponse) {
        dispatch({ type: GET_ALERTS_SUCCESS });
    })
    .catch(function (error : AxiosError) {
        console.log("got an error");
        dispatch({ type: GET_ALERTS_FAILURE, payload: error });
        console.error(error);
    });
    
}

