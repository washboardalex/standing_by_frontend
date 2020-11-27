import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { fArgReturn, fEmptyReturn } from '../utils/types';
import { createStructuredSelector } from 'reselect';
import { Dispatch, AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../redux/root-reducer';
import { selectFirebaseToken, selectDeviceId, selectFirebaseTokenId } from '../redux/firebase/firebase.selectors';
import { getActiveAlerts } from '../redux/alerts/alerts.actions';
import { selectActiveAlerts } from '../redux/alerts/alerts.selectors';
import { getFirebaseToken, sendFirebaseTokentoAdminServer } from '../redux/firebase/firebase.actions';
import { IAlert } from 'src/models/admin/IAlert';

interface IReduxStateProps {
    firebaseCloudMessageToken: null | string,
    fcmTokenAdminId: null | number,
    deviceId: string,
    alerts: Array<IAlert>
}

interface IDispatchProps {
    getFirebaseToken: fEmptyReturn,
    sendFirebaseTokentoAdminServer: fArgReturn,
    getActiveAlerts: fArgReturn
}

type ActiveAlertsProps = IReduxStateProps & IDispatchProps;

class ActiveAlerts extends React.Component<ActiveAlertsProps> {

    async componentDidMount() {

        const { 
            firebaseCloudMessageToken, 
            getFirebaseToken, 
            deviceId, 
            sendFirebaseTokentoAdminServer,
        } = this.props;

        if (!firebaseCloudMessageToken) {
            const token = await getFirebaseToken();
            if (token) await sendFirebaseTokentoAdminServer(token, deviceId);
        }
    }

    async componentDidUpdate() {

        const { fcmTokenAdminId, getActiveAlerts, alerts } = this.props;

        console.log('firebase admin id is: ');
        console.log(fcmTokenAdminId);

        if (fcmTokenAdminId) {
            console.log('we got here')
            await getActiveAlerts(fcmTokenAdminId);
            console.log('ok lets see if it worked:');
            console.log(alerts);
        }
    }

    render() {
        return (
            <View>
                <Text>
                    Well here we are. The ActiveAlerts component.
                </Text>
            </View>
        );
    }
};


const mapStateToProps = createStructuredSelector<AppState, IReduxStateProps>({
    firebaseCloudMessageToken: selectFirebaseToken,
    fcmTokenAdminId: selectFirebaseTokenId,
    deviceId: selectDeviceId,
    alerts: selectActiveAlerts
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction> | Dispatch<AnyAction>) => ({
    getFirebaseToken: () => dispatch<any>(getFirebaseToken()),
    sendFirebaseTokentoAdminServer: (token : string, deviceId: string) => dispatch<any>(sendFirebaseTokentoAdminServer(token, deviceId)),
    getActiveAlerts: (id: number) => dispatch<any>(getActiveAlerts(id))
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveAlerts);

