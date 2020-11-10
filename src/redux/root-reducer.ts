import { combineReducers } from 'redux';
import countryListReducer from './country-list/country-list.reducer';
import alertsReducer from './alerts/alerts.reducer';


const rootReducer = combineReducers({
    countryList: countryListReducer,
    alerts: alertsReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
