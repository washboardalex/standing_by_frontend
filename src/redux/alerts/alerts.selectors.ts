import { createSelector } from 'reselect';
import { AppState } from '../root-reducer';
import { IAlertsState } from './alerts.reducer';

const selectAlerts = (state : AppState) => state.alerts;

export const selectActiveAlerts = createSelector(
    [selectAlerts],
    (alerts : IAlertsState) =>  alerts.alerts
);

export const selectNewAlertFlow = createSelector(
    [selectAlerts],
    (alerts : IAlertsState) =>  alerts.newAlertFlow
);

export const selectDeleteAlertFlow = createSelector(
    [selectAlerts],
    (alerts : IAlertsState) => alerts.deleteAlertFlow
);

export const selectAlertPendingDelete = createSelector(
    [selectAlerts],
    (alerts : IAlertsState) => alerts.alertPendingDelete
);

export const selectAlertsFetching = createSelector(
    [selectAlerts],
    (alerts : IAlertsState) => alerts.fetching
)

