import { AppState } from '../root-reducer';
import { createSelector } from 'reselect';
import { ICountrySummaryListState } from './country-list.reducer';
import ICountrySummary from '../../models/covidapi/ICountrySummary';
import {sortCountriesAlphabetical} from './country-list.utils';

const selectCountryListState = (state : AppState) => state.countryList;

export const selectCountries = createSelector(
    [selectCountryListState],
    (countryList : ICountrySummaryListState) : Array<ICountrySummary> => countryList.data
);

export const selectCountriesAlphabetical = createSelector(
    [selectCountryListState],
    (countryList : ICountrySummaryListState) : Array<ICountrySummary> => countryList.data.length ? sortCountriesAlphabetical([...countryList.data]) : []
)
