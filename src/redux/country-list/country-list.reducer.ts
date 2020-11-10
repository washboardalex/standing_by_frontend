import { AnyAction } from 'redux';
import {
    GET_COUNTRIES_PENDING,
    GET_COUNTRIES_SUCCESS,
    GET_COUNTRIES_FAILURE
} from './country-list.constants';
import ICountry from '../../models/apicorona/ICountry';

export interface ICountryListState {
    fetching: boolean,
    data: Array<ICountry>,
    errorMessage: string | null
}

const initState : ICountryListState = {
    fetching: true,
    data: [],
    errorMessage: null
}

const countryListReducer = (state : ICountryListState = initState, action : AnyAction) => {
    switch(action.type) {
        case GET_COUNTRIES_PENDING:
            return { ...state, fetching: true, }

        case GET_COUNTRIES_SUCCESS:
            console.log("")
            console.log("")
            console.log("")
            console.log("")
            console.log("")
            console.log("This looks like the thing");
            console.log(action.payload.data)
            console.log("")
            console.log("")
            console.log("")
            console.log("")
            console.log("")
            console.log("")
            return { ...state, fetching: false, data: action.payload.data, errorMessage: null }
        
        case GET_COUNTRIES_FAILURE:
            return { ...state, fetching: false, errorMessage: action.payload }

        default: 
            return { ...state }
    }
}

export default countryListReducer;
