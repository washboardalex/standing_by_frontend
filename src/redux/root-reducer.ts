import { combineReducers } from 'redux';
import countryListReducer from './country-list/country-list.reducer';
import firebaseReducer from './firebase/firebase.reducer';
import alertsReducer from './alerts/alerts.reducer';


const rootReducer = combineReducers({
    countryList: countryListReducer,
    firebase: firebaseReducer,
    alerts: alertsReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
