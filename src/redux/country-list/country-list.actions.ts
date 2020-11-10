import axios, { AxiosResponse, AxiosError, AxiosRequestConfig } from 'axios';
import { covidApiUrl, headers} from '../../utils/constants';
import { Dispatch } from 'redux';
import {
    GET_COUNTRIES_PENDING,
    GET_COUNTRIES_SUCCESS,
    GET_COUNTRIES_FAILURE
} from './country-list.constants';



export const getCountryList = () =>  (dispatch : Dispatch)  => {
    dispatch({ type: GET_COUNTRIES_PENDING });

    headers['X-Access-Token'] = '5cf9dfd5-3449-485e-b5ae-70a60e997864';

    const axiosConfig = { headers };
    
    axios.get(`${covidApiUrl}/summary`, axiosConfig)
        .then((response : AxiosResponse)  =>  {
            response.status === 200 && response.data
                ? dispatch({ type: GET_COUNTRIES_SUCCESS, payload: response.data.Countries })
                : dispatch ({ type: GET_COUNTRIES_FAILURE })
        }
        )
        .catch((error : AxiosError) => {
            dispatch ({ type: GET_COUNTRIES_FAILURE, payload: error.message });
            console.error(error);
        });
}

    