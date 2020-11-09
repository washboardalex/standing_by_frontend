import axios, { AxiosResponse, AxiosError } from 'axios';
import { coinApiUrl, headers } from '../../utils/constants';
import { Dispatch } from 'redux';
import {
    GET_COINS_PENDING,
    GET_COINS_SUCCESS,
    GET_COINS_FAILURE
} from './coinlist.constants';



export const getCoinList = () =>  (dispatch : Dispatch)  => {
    dispatch({ type: GET_COINS_PENDING });

    const axiosConfig = { headers };
    
    axios.get(`${coinApiUrl}/v2/assets`, axiosConfig)
        .then((response : AxiosResponse)  =>  
            response.status === 200 && response.data
                ? dispatch({ type: GET_COINS_SUCCESS, payload: response.data.data })
                : dispatch ({ type: GET_COINS_FAILURE })
        )
        .catch((error : AxiosError) => {
            dispatch ({ type: GET_COINS_FAILURE, payload: error.message });
            console.error(error);
        });
}

