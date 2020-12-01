import { AnyAction } from "redux"
import { IAlert } from "src/models/admin/IAlert"
import {
    GET_ALERTS_PENDING,
    GET_ALERTS_FAILURE,
    GET_ALERTS_SUCCESS,
    CREATE_ALERT_PENDING,
    CREATE_ALERT_FAILURE,
    CREATE_ALERT_SUCCESS,
    DELETE_ALERT_PENDING,
    DELETE_ALERT_SUCCESS,
    DELETE_ALERT_FAILURE

} from './alerts.constants';

export interface IAlertsState {
    fetching: boolean,
    alerts: null | Array<IAlert>,
    error: any
}

const initState : IAlertsState = {
    fetching: true,
    alerts: null,
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
            
            let newAlerts : Array<IAlert> = state.alerts === null ? [] : state.alerts;
            newAlerts.push(action.payload);

            return { 
                ...state,
                alerts: [ ...newAlerts ], 
                fetching: false
            }

        case CREATE_ALERT_FAILURE:
            return { 
                ...state, 
                fetching: false, 
                error: action.payload
            }
        //DELTE ALERT
        case DELETE_ALERT_PENDING:
            return { 
                ...state, 
                fetching: true 
            }
            
        case DELETE_ALERT_SUCCESS:

            let deleteAlert = state.alerts;
            deleteAlert = deleteAlert!.filter((alert : IAlert) => {
                return alert.id !== action.payload
            });

            return { 
                ...state,
                alerts: [ ...deleteAlert ],
                fetching: false
            }

        case DELETE_ALERT_FAILURE:
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




