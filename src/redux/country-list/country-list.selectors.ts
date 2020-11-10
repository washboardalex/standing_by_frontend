import { AppState } from '../root-reducer';
import { createSelector } from 'reselect';
import { ICountryListState } from './country-list.reducer';
import ICountry from 'src/models/apicorona/ICountry';

const selectCountryListState = (state : AppState) => state.countryList;

export const selectCountryListData = createSelector(
    [selectCountryListState],
    (countryList : ICountryListState) : Array<ICountry> => countryList.data
);

