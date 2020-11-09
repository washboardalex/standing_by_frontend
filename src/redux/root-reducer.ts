import { combineReducers } from 'redux';
import coinListReducer from './coinlist/coinlist.reducer';
import alertsReducer from './alerts/alerts.reducer';


const rootReducer = combineReducers({
    coinList: coinListReducer,
    alerts: alertsReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;
