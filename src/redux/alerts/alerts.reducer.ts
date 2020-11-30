import { AnyAction } from "redux"
import { IAlert } from "src/models/admin/IAlert"
import {
    GET_ALERTS_PENDING,
    GET_ALERTS_FAILURE,
    GET_ALERTS_SUCCESS,
    CREATE_ALERT_PENDING,
    CREATE_ALERT_FAILURE,
    CREATE_ALERT_SUCCESS
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
        //GET ALERTS
        case GET_ALERTS_PENDING:
            return { 
                ...state, 
                fetching: true 
            }

        case GET_ALERTS_SUCCESS:
            return { 
                ...state,
                alerts: action.payload, 
                fetching: false, 
            }

        case GET_ALERTS_FAILURE:
            return { 
                ...state, 
                fetching: false, 
                error: action.payload
            }
        //CREATE ALERT
        case CREATE_ALERT_PENDING:
            return { 
                ...state, 
                fetching: true 
            }
            
        case CREATE_ALERT_SUCCESS:
            
            const alerts : Array<IAlert> = state.alerts;
            alerts.push(action.payload);

            return { 
                ...state,
                alerts: alerts, 
                fetching: false
            }

        case CREATE_ALERT_FAILURE:
            return { 
                ...state, 
                fetching: false, 
                error: action.payload
            }
        //DEFAULT
        default: 
            return { ...state }
    }
}

export default alertsReducer;




