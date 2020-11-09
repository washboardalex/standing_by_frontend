import { AnyAction } from 'redux';
import {
    GET_COINS_PENDING,
    GET_COINS_SUCCESS,
    GET_COINS_FAILURE
} from './coinlist.constants';
import { formatCoinData } from './coinlist.utils';
import ICoin from '../../models/coincap/ICoin';

export interface ICoinListState {
    fetching: boolean,
    data: Array<ICoin>,
    errorMessage: string | null
}

const initState : ICoinListState = {
    fetching: true,
    data: [],
    errorMessage: null
}

const coinListReducer = (state : ICoinListState = initState, action : AnyAction) => {
    switch(action.type) {
        case GET_COINS_PENDING:
            return { ...state, fetching: true, }

        case GET_COINS_SUCCESS:
            const coinData = formatCoinData(action.payload);
            return { ...state, fetching: false, data: coinData, errorMessage: null }
        
        case GET_COINS_FAILURE:
            return { ...state, fetching: false, errorMessage: action.payload }

        default: 
            return { ...state }
    }
}

export default coinListReducer;
