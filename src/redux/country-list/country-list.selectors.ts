import { AppState } from '../root-reducer';
import { createSelector } from 'reselect';
import { ICountrySummaryListState } from './country-list.reducer';
import ICountrySummary from 'src/models/covidapi/ICountrySummarySummary';

const selectCountryListState = (state : AppState) => state.countryList;

export const selectCountryListData = createSelector(
    [selectCountryListState],
    (countryList : ICountrySummaryListState) : Array<ICountrySummary> => countryList.data
);

