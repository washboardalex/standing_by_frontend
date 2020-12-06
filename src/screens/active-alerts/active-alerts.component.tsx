import React from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { fArgReturn, fEmptyReturn } from '../../utils/types';
import { createStructuredSelector } from 'reselect';
import { Dispatch, AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../redux/root-reducer';
import { selectFirebaseToken, selectDeviceId, selectFirebaseTokenId } from '../../redux/firebase/firebase.selectors';
import { getActiveAlerts } from '../../redux/alerts/alerts.actions';
import { selectActiveAlerts, selectAlertsFetching } from '../../redux/alerts/alerts.selectors';
import { getFirebaseToken, sendFirebaseTokentoAdminServer } from '../../redux/firebase/firebase.actions';
import { IAlert } from '../../models/admin/IAlert';
import { FlatList } from 'react-native-gesture-handler';
import { selectCountries, selectCountriesFetching } from '../../redux/country-list/country-list.selectors';
import AlertSummary from '../../components/alert-summary/alert-summary.component';
import ICountrySummary from '../../models/covidapi/ICountrySummary';
import { getCountryList } from '../../redux/country-list/country-list.actions';
import styles from './active-alerts.styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { appBackgroundColour, appTextColour } from '../../utils/styles';

interface IReduxStateProps {
    firebaseCloudMessageToken: null | string,
    fcmTokenAdminId: null | number,
    deviceId: string,
    alerts: null | Array<IAlert>,
    countries: Array<ICountrySummary>,
    isAlertsFetching: boolean,
    isCountriesFetching: boolean
}

interface IDispatchProps {
    getFirebaseToken: fEmptyReturn,
    sendFirebaseTokentoAdminServer: fArgReturn,
    getActiveAlerts: fArgReturn,
    getCountryList: fArgReturn
}

interface IReactNavigatorProps {
    navigation: any
}

type ActiveAlertsProps = IReduxStateProps & IDispatchProps & IReactNavigatorProps;

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

        const { alerts, navigation, isAlertsFetching, isCountriesFetching } = this.props;
        const { container, noAlerts, text, loadingContainer } = styles;

        if (isAlertsFetching) {
            return (
                <View style={loadingContainer}>
                    <Icon name='hourglass-outline' style={{marginTop: '30%'}} size={128} color={appTextColour} />
                </View>
            )
        }

        return (
            <View style={container}>
                {alerts && alerts.length
                    ?
                        <FlatList
                            data={alerts}
                            renderItem={({item}) => (
                                <AlertSummary 
                                    country={item.country}
                                    type={item.type}
                                    condition={item.condition}
                                    value={item.value}
                                    id={item.id}
                                    countrySlug={item.countrySlug}
                                />
                            )}
                        />
                    :
                        <View style={noAlerts}>
                            <Text style={text}>Add an Alert</Text>
                            <Icon name='add-circle-outline' size={64} color={appTextColour} onPress={() => navigation.navigate('add')} />
                        </View>
                }
            </View>
        );
    }
};


const mapStateToProps = createStructuredSelector<AppState, IReduxStateProps>({
    isAlertsFetching: selectAlertsFetching,
    firebaseCloudMessageToken: selectFirebaseToken,
    fcmTokenAdminId: selectFirebaseTokenId,
    deviceId: selectDeviceId,
    alerts: selectActiveAlerts,
    countries: selectCountries,
    isCountriesFetching: selectCountriesFetching
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction> | Dispatch<AnyAction>) => ({
    getFirebaseToken: () => dispatch<any>(getFirebaseToken()),
    sendFirebaseTokentoAdminServer: (token : string, deviceId: string) => dispatch<any>(sendFirebaseTokentoAdminServer(token, deviceId)),
    getActiveAlerts: (id: number) => dispatch<any>(getActiveAlerts(id)),
    getCountryList: () => dispatch<any>(getCountryList())
});

export default connect(mapStateToProps, mapDispatchToProps)(ActiveAlerts);

