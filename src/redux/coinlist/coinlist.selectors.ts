import { AppState } from '../root-reducer';
import { createSelector } from 'reselect';
import { ICoinListState } from './coinlist.reducer';
import ICoin from 'src/models/coincap/ICoin';

const selectCoinListState = (state : AppState) => state.coinList;

export const selectCoinListData = createSelector(
    [selectCoinListState],
    (coinList : ICoinListState) : Array<ICoin> => coinList.data
);

