import { createSelector } from 'reselect';
import { AppState } from '../root-reducer';
import { IAlertsState } from './alerts.reducer';

const selectAlerts = (state : AppState) => state.alerts;

export const selectFirebaseToken = createSelector(
    [selectAlerts],
    (alerts : IAlertsState) => alerts.firebaseCloudMessageToken
);

export const selectFirebaseTokenId = createSelector(
    [selectAlerts],
    (alerts : IAlertsState) => alerts.fcmTokenAdminId
)