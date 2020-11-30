import { createSelector } from 'reselect';
import { AppState } from '../root-reducer';
import { IAlertsState } from './alerts.reducer';

const selectAlerts = (state : AppState) => {
    console.log('appstate')
    console.log(state)
    return state.alerts;
}

export const selectActiveAlerts = createSelector(
    [selectAlerts],
    (alerts : IAlertsState) => {
        console.log('heres the state: ', alerts);
        console.log(alerts.alerts);
        return alerts.alerts
    }
);

