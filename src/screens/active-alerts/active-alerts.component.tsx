import React from 'react';
import { View, Text, NavigatorIOS } from 'react-native';
import { connect } from 'react-redux';
import { fArgReturn, fEmptyReturn } from '../../utils/types';
import { createStructuredSelector } from 'reselect';
import { Dispatch, AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { AppState } from '../../redux/root-reducer';
import { selectFirebaseToken, selectDeviceId, selectFirebaseTokenId } from '../../redux/firebase/firebase.selectors';
import { getActiveAlerts } from '../../redux/alerts/alerts.actions';
import { selectActiveAlerts } from '../../redux/alerts/alerts.selectors';
import { getFirebaseToken, sendFirebaseTokentoAdminServer } from '../../redux/firebase/firebase.actions';
import { IAlert } from '../../models/admin/IAlert';
import { FlatList } from 'react-native-gesture-handler';
import { selectCountries } from '../../redux/country-list/country-list.selectors';
import AlertSummary from '../../components/alert-summary/alert-summary.component';
import ICountrySummary from '../../models/covidapi/ICountrySummary';
import { getCountryList } from '../../redux/country-list/country-list.actions';
import styles from './active-alerts.styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { appTextColour } from '../../utils/styles';
import { NavigationActions } from 'react-navigation';

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

        const { alerts, navigation } = this.props;
        const { container, noAlerts, text } = styles;

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
