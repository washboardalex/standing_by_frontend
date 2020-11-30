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
import { IAlert } from '../models/admin/IAlert';
import { FlatList } from 'react-native-gesture-handler';
import { selectCountries } from '../redux/country-list/country-list.selectors';
import AlertSummary from '../components/alert-summary/alert-summary.component';
import ICountrySummary from '../models/covidapi/ICountrySummary';
import { getCountryList } from '../redux/country-list/country-list.actions';

interface IReduxStateProps {
    firebaseCloudMessageToken: null | string,
    fcmTokenAdminId: null | number,
    deviceId: string,
    alerts: null | Array<IAlert>,
    countries: Array<ICountrySummary>
}

interface IDispatchProps {
    getFirebaseToken: fEmptyReturn,
    sendFirebaseTokentoAdminServer: fArgReturn,
    getActiveAlerts: fArgReturn,
    getCountryList: fArgReturn
}

type ActiveAlertsProps = IReduxStateProps & IDispatchProps;

class ActiveAlerts extends React.Component<ActiveAlertsProps> {

    async componentDidMount() {

        const { 
            firebaseCloudMessageToken, 
            deviceId, 
            getFirebaseToken, 
            sendFirebaseTokentoAdminServer,
            fcmTokenAdminId,
            countries,
            getCountryList
        } = this.props;

        if (!firebaseCloudMessageToken) {
            const token = await getFirebaseToken();
            if (token) sendFirebaseTokentoAdminServer(token, deviceId);
        }

        if (fcmTokenAdminId) 
            await getActiveAlerts(fcmTokenAdminId);

        console.log('countries are: ')
        console.log(countries)
        console.log('');console.log('');console.log('');console.log('');console.log('');console.log('');

        if (!countries.length) 
            getCountryList();
    }

    async componentDidUpdate() {
        const { fcmTokenAdminId, getActiveAlerts, alerts } = this.props;

        if (fcmTokenAdminId && !alerts) {
            await getActiveAlerts(fcmTokenAdminId);
        }
    }

    render() {

        const { alerts } = this.props;

        console.log('rendering')
        console.log('alerts are : ')
        console.log(alerts)
        console.log('');console.log('');console.log('');console.log('');console.log('');

        return (
            <View>
                <FlatList
                    data={alerts}
                    renderItem={({item}) => (
                        <AlertSummary 
                            country={item.country}
                            type={item.type}
                            condition={item.condition}
                            value={item.value}
                            id={item.id}
                        />
                    )}
                />
            </View>
        );
    }
};


const mapStateToProps = createStructuredSelector<AppState, IReduxStateProps>({
    firebaseCloudMessageToken: selectFirebaseToken,
    fcmTokenAdminId: selectFirebaseTokenId,
    deviceId: selectDeviceId,
    alerts: selectActiveAlerts,
    countries: selectCountries
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction> | Dispatch<AnyAction>) => ({
    getFirebaseToken: () => dispatch<any>(getFirebaseToken()),
    sendFirebaseTokentoAdminServer: (token : string, deviceId: string) => dispatch<any>(sendFirebaseTokentoAdminServer(token, deviceId)),
    getActiveAlerts: (id: number) => dispatch<any>(getActiveAlerts(id)),
    getCountryList: () => dispatch<any>(getCountryList())
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveAlerts);

