import { AnyAction } from 'redux';
import {
    GET_COUNTRIES_PENDING,
    GET_COUNTRIES_SUCCESS,
    GET_COUNTRIES_FAILURE
} from './country-list.constants';
import ICountrySummary from '../../models/covidapi/ICountrySummarySummary';
import {formatCountries, sortCountriesByDailyConfirmed} from './country-list.utils';

export interface ICountrySummaryListState {
    fetching: boolean,
    data: Array<ICountrySummary>,
    errorMessage: string | null
}

const initState : ICountrySummaryListState = {
    fetching: true,
    data: [],
    errorMessage: null
}

const countryListReducer = (state : ICountrySummaryListState = initState, action : AnyAction) => {
    switch(action.type) {
        case GET_COUNTRIES_PENDING:
            return { ...state, fetching: true, }

        case GET_COUNTRIES_SUCCESS:

            return { 
                ...state, 
                fetching: false, 
                data: sortCountriesByDailyConfirmed(formatCountries(action.payload)), 
                errorMessage: null 
            }
        
        case GET_COUNTRIES_FAILURE:
            return { ...state, fetching: false, errorMessage: action.payload }

        default: 
            return { ...state }
    }
}

export default countryListReducer;
