import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { fArgReturn, fEmptyReturn } from '../utils/types';
import { createStructuredSelector } from 'reselect';
import { Dispatch, AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../redux/root-reducer';
import { selectFirebaseToken, selectDeviceId } from '../redux/firebase/firebase.selectors';
import { getFirebaseToken, sendFirebaseTokentoAdminServer } from '../redux/firebase/firebase.actions';

interface IReduxStateProps {
    firebaseCloudMessageToken: null | string,
    deviceId: string
}

interface IDispatchProps {
    getFirebaseToken: fEmptyReturn,
    sendFirebaseTokentoAdminServer: fArgReturn
}

type ActiveAlertsProps = IReduxStateProps & IDispatchProps;

class ActiveAlerts extends React.Component<ActiveAlertsProps> {

    async componentDidMount() {

        const { firebaseCloudMessageToken, getFirebaseToken, deviceId, sendFirebaseTokentoAdminServer } = this.props;

        if (!firebaseCloudMessageToken) {
            const token = await getFirebaseToken();
            if (token) sendFirebaseTokentoAdminServer(token, deviceId);
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
    deviceId: selectDeviceId
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction> | Dispatch<AnyAction>) => ({
    getFirebaseToken: () => dispatch<any>(getFirebaseToken()),
    sendFirebaseTokentoAdminServer: (token : string, deviceId: string) => dispatch<any>(sendFirebaseTokentoAdminServer(token, deviceId))
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveAlerts);

