import { AnyAction } from 'redux';
import {
    SET_FIREBASE_PENDING,
    SET_FIREBASE_SUCCESS,
    SET_FIREBASE_FAILURE,
    SET_FIREBASE_ADMIN_PENDING,
    SET_FIREBASE_ADMIN_SUCCESS,
    SET_FIREBASE_ADMIN_FAILURE
} from './alerts.constants';


export interface IAlertsState {
    fetching: boolean,
    firebaseCloudMessageToken: null | string,
    error: any
}

const initState : IAlertsState = {
    fetching: true,
    firebaseCloudMessageToken: null,
    error: null
}

const alertsReducer = (state : IAlertsState = initState, action : AnyAction) => {
    switch(action.type) {
        case SET_FIREBASE_PENDING:
            return { 
                ...state, 
                fetching: true 
            }

        case SET_FIREBASE_SUCCESS:
            return { 
                ...state, 
                fetching: false, 
                firebaseCloudMessageToken: action.payload, 
                error: null 
            }
        
        case SET_FIREBASE_FAILURE:
            return { 
                ...state, 
                fetching: false, 
                error: action.payload
            }
        case SET_FIREBASE_ADMIN_PENDING:
            return { 
                ...state, 
                fetching: true 
            }

        case SET_FIREBASE_ADMIN_SUCCESS:
            return { 
                ...state, 
                fetching: false, 
                error: null 
            }
        
        case SET_FIREBASE_ADMIN_FAILURE:
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


