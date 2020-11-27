import { AnyAction } from "redux"
import { IAlert } from "src/models/admin/IAlert"
import {
    GET_ALERTS_PENDING,
    GET_ALERTS_FAILURE,
    GET_ALERTS_SUCCESS
} from './alerts.constants';

export interface IAlertsState {
    fetching: boolean,
    alerts: Array<IAlert>,
    error: any
}

const initState : IAlertsState = {
    fetching: true,
    alerts: [],
    error: null
}

const alertsReducer = (state : IAlertsState = initState, action : AnyAction) => {
    switch(action.type) {
        case GET_ALERTS_PENDING:
            return { 
                ...state, 
                fetching: true 
            }
        case GET_ALERTS_SUCCESS:
            return { 
                ...state, 
                fetching: false, 
            }
        case GET_ALERTS_FAILURE:
            return { 
                ...state, 
                fetching: false, 
                error: action.payload
            }
        default: 
            return { ...state }
    }
}

export default alertsReducer;




