import React from 'react';
import { View, Button } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { Dispatch, AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { AppState } from '../redux/root-reducer';
import { selectFirebaseToken, selectDeviceId } from '../redux/firebase/firebase.selectors';
import { fArgReturn, fEmptyReturn } from '../utils/types';
import { getFirebaseToken, sendFirebaseTokentoAdminServer } from '../redux/firebase/firebase.actions';

import CountryList from '../components/country-list.component';

interface IReduxStateProps {
    firebaseCloudMessageToken: null | string,
    deviceId: string
}

interface IDispatchProps {
    getFirebaseToken: fEmptyReturn,
    sendFirebaseTokentoAdminServer: fArgReturn
}

interface IReactNavigationProps {
    navigation: any
}

type CountriesProps = IReduxStateProps & IDispatchProps & IReactNavigationProps;

class Countries extends React.Component<CountriesProps>{
    async componentDidMount() {

        const { firebaseCloudMessageToken, getFirebaseToken, deviceId, sendFirebaseTokentoAdminServer } = this.props;

        if (!firebaseCloudMessageToken) {
            const token = await getFirebaseToken();
            if (token) sendFirebaseTokentoAdminServer(token, deviceId);
        }
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <CountryList />
                <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
                    <Button title='Add a New Alert' onPress={() => navigation.navigate('AddAlert')} />
                </View>
            </View>
        );
    }
} 


const mapStateToProps = createStructuredSelector<AppState, IReduxStateProps>({
    firebaseCloudMessageToken: selectFirebaseToken,
    deviceId: selectDeviceId
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction> | Dispatch<AnyAction>) => ({
    getFirebaseToken: () => dispatch<any>(getFirebaseToken()),
    sendFirebaseTokentoAdminServer: (token : string, deviceId: string) => dispatch<any>(sendFirebaseTokentoAdminServer(token, deviceId))
});

export default connect(mapStateToProps, mapDispatchToProps)(Countries);

