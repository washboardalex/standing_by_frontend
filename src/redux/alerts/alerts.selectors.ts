import { createSelector } from 'reselect';
import { AppState } from '../root-reducer';
import { IAlertsState } from './alerts.reducer';

const selectAlerts = (state : AppState) => state.alerts;

export const selectActiveAlerts = createSelector(
    [selectAlerts],
    (alerts : IAlertsState) => alerts.alerts
);

