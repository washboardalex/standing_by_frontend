import { AppState } from '../root-reducer';
import { createSelector } from 'reselect';
import { ICountrySummaryListState } from './country-list.reducer';
import ICountrySummary from 'src/models/covidapi/ICountrySummary';

const selectCountryListState = (state : AppState) => state.countryList;

export const selectCountries = createSelector(
    [selectCountryListState],
    (countryList : ICountrySummaryListState) : Array<ICountrySummary> => countryList.data
);

