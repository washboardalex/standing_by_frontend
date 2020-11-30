import React from 'react';
import { View, Text, TextInput, StyleSheet, Button, NativeTouchEvent, NativeSyntheticEvent } from 'react-native';
import {Picker} from '@react-native-community/picker';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectCountries } from '../redux/country-list/country-list.selectors';
import { selectFirebaseToken, selectFirebaseTokenId } from '../redux/firebase/firebase.selectors';
import { AppState } from '../redux/root-reducer';
import ICountrySummary from '../models/covidapi/ICountrySummary';
import { AlertCondition, AlertType } from 'src/models/admin/IAlert';
import { AnyAction, Dispatch } from 'redux';
import { createNewAlert } from '../redux/alerts/alerts.actions';
import { fArgReturn } from '../utils/types';


const styles = StyleSheet.create({  
    textInput: {  
        textAlign: 'center',  
        height: 40,  
        borderRadius: 10,  
        borderWidth: 2,  
        borderColor: '#333333',  
        marginBottom: 10  
    }
});

interface IReduxStateProps {
    countryList: Array<ICountrySummary>,
    cloudMessageToken : string | null,
    fcmTokenId: number | null
}

interface IDispatchProps {
    createNewAlert: fArgReturn
}

type AddAlertProps = IReduxStateProps & IDispatchProps;

interface ILocalState {
    selectedCountry: string,
    condition: AlertCondition,
    type: AlertType
    value: number
}

class AddAlert extends React.Component<AddAlertProps, ILocalState> { 
    
    state : ILocalState = {
        selectedCountry: 'US',
        condition: 'greaterThan',
        type: 'newConfirmed',
        value: 0
    }
    
    render() {
        const { countryList, createNewAlert, cloudMessageToken, fcmTokenId } = this.props;
        const { selectedCountry, condition, value, type } = this.state;

        return (
            <View style={{flex: 1}}>
                <Text>Alert me when</Text>
                <Picker
                    selectedValue={this.state.type}
                    onValueChange={(itemValue : any, itemIndex) => this.setState({type: itemValue as AlertType}) }
                >
                    <Picker.Item label='new confirmed cases' value='newConfirmed' /> 
                    <Picker.Item label='new confirmed deaths' value='newDeaths' />
                </Picker>
                <Text>in</Text>
                <Picker
                    selectedValue={this.state.selectedCountry}
                    onValueChange={(itemValue, itemIndex) => this.setState({selectedCountry: itemValue.toString()}) }
                >
                    {countryList.map((item: ICountrySummary) => 
                        <Picker.Item label={`${item.country} (${item.countryCode})`} value={item.countryCode} /> 
                    )}
                </Picker>
                <Text>are</Text>
                <Picker
                    selectedValue={this.state.condition}
                    onValueChange={(itemValue, itemIndex) => this.setState({condition: itemValue.toString() as AlertCondition})}
                >
                    <Picker.Item label='greater than' value='greaterThan' /> 
                    <Picker.Item label='less than' value='lessThan' />
                </Picker>
                <TextInput  
                    onChangeText={text => this.setState({ value: Number(text) })}
                    placeholder='00.00'
                    underlineColorAndroid='white'
                    style={styles.textInput}
                    keyboardType={'numeric'}
                />  
                <Button
                    onPress={(e : NativeSyntheticEvent<NativeTouchEvent>) => createNewAlert(selectedCountry, condition, value, type, cloudMessageToken, fcmTokenId)}
                    title="Create New Alert"
                    color="#841584"
                    accessibilityLabel="Create New Alert"
                />
            </View>
            
        );
    }
}

const mapStateToProps = createStructuredSelector<AppState, IReduxStateProps>({
    countryList: selectCountries,
    cloudMessageToken: selectFirebaseToken,
    fcmTokenId: selectFirebaseTokenId
});

const mapDispatchToProps =  (dispatch: Dispatch<AnyAction>) => ({
    createNewAlert: (country : string, condition : AlertCondition, value : number, type : AlertType, cloudMessageToken : null | string, fcmTokenId : null | number) => 
            dispatch<any>(createNewAlert(country, condition, value, type, cloudMessageToken, fcmTokenId))
})

export default connect(mapStateToProps, mapDispatchToProps)(AddAlert);
