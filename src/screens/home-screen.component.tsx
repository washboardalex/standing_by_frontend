import React from 'react';
import { View, Button } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { Dispatch, AnyAction } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { connect } from 'react-redux';
import { AppState } from '../redux/root-reducer';
import { selectFirebaseToken } from '../redux/alerts/alerts.selectors';
import { fArgReturn, fEmptyReturn } from '../utils/types';
import { getFirebaseToken, sendFirebaseTokentoAdminServer } from '../redux/alerts/alerts.actions';

import CountryList from '../components/country-list';

interface IReduxStateProps {
    firebaseCloudMessageToken: null | string
}

interface IDispatchProps {
    getFirebaseToken: fEmptyReturn,
    sendFirebaseTokentoAdminServer: fArgReturn
}

interface IReactNavigationProps {
    navigation: any
}

type HomeScreenProps = IReduxStateProps & IDispatchProps & IReactNavigationProps;

class HomeScreen extends React.Component<HomeScreenProps>{
    async componentDidMount() {

        const { firebaseCloudMessageToken, getFirebaseToken, sendFirebaseTokentoAdminServer } = this.props;

        if (!firebaseCloudMessageToken) {
            const token = await getFirebaseToken();
            if (token) sendFirebaseTokentoAdminServer(token);
        }
    }

    render() {
        const { navigation } = this.props;

        return (
            <View style={{ flex: 1 }}>
                <CountryList />
                <View style={{position: 'absolute', bottom: 0, left: 0, right: 0}}>
                    <Button title='Add a New Alert' onPress={() => navigation.navigate('Alerts')} />
                </View>
            </View>
        );
    }
} 


const mapStateToProps = createStructuredSelector<AppState, IReduxStateProps>({
    firebaseCloudMessageToken: selectFirebaseToken,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction> | Dispatch<AnyAction>) => ({
    getFirebaseToken: () => dispatch<any>(getFirebaseToken()),
    sendFirebaseTokentoAdminServer: (token : string) => dispatch<any>(sendFirebaseTokentoAdminServer(token))
});

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

