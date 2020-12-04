import { createSelector } from 'reselect';
import { AppState } from '../root-reducer';
import { IFirebaseState } from './firebase.reducer';

const selectFirebase = (state : AppState) => state.firebase;

export const selectFirebaseToken = createSelector(
    [selectFirebase],
    (firebase : IFirebaseState) => firebase.firebaseCloudMessageToken
);

export const selectFirebaseTokenId = createSelector(
    [selectFirebase],
    (firebase : IFirebaseState) => firebase.fcmTokenAdminId
);

export const selectDeviceId = createSelector(
    [selectFirebase],
    (firebase : IFirebaseState) => firebase.deviceId
);

