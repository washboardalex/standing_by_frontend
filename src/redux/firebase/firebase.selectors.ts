import { createSelector } from 'reselect';
import { AppState } from '../root-reducer';
import { IAlertsState } from './firebase.reducer';

const selectAlerts = (state : AppState) => state.alerts;

export const selectFirebaseToken = createSelector(
    [selectAlerts],
    (alerts : IAlertsState) => alerts.firebaseCloudMessageToken
);

export const selectFirebaseTokenId = createSelector(
    [selectAlerts],
    (alerts : IAlertsState) => alerts.fcmTokenAdminId
);

export const selectDeviceId = createSelector(
    [selectAlerts],
    (alerts : IAlertsState) => alerts.deviceId
);