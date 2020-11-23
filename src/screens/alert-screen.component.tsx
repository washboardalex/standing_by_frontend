import React from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import {Picker} from '@react-native-community/picker';
import { createStructuredSelector } from 'reselect';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { connect } from 'react-redux';
import { headers, adminUrl } from '../utils/constants';
import { selectCountryListData } from '../redux/country-list/country-list.selectors';
import { selectFirebaseToken, selectFirebaseTokenId } from '../redux/firebase/firebase.selectors';
import { AppState } from '../redux/root-reducer';
import ICountrySummary from '../models/covidapi/ICountrySummary';
import { IAlert, AlertCondition, AlertType } from 'src/models/admin/IAlert';



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
    cmTokenId: number | null
}

interface ILocalState {
    selectedCountry: string,
    condition: AlertCondition,
    type: AlertType
    value: number
}

class Alerts extends React.Component<IReduxStateProps, ILocalState> { 
    
    state : ILocalState = {
        selectedCountry: 'US',
        condition: 'greaterThan',
        type: 'newConfirmed',
        value: 0
    }

    createNewAlert = () => {

        const { selectedCountry, condition, value, type } = this.state;

        const newAlert : IAlert = {
            condition: condition,
            value: value,
            type: type,
            country: selectedCountry
        }

        axios({
            method: 'post',
            url: `${adminUrl}/alert`,
            headers: headers,
            data: { 
                newAlert,
                token: this.props.cloudMessageToken,
                tokenId: this.props.cmTokenId
            }
        })
        .then((response : AxiosResponse) => console.log(response))
        .catch((error : AxiosError) => {
            console.error(error);
        });
    }
    
    render() {
        const { countryList } = this.props;

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
                    onPress={this.createNewAlert}
                    title="Create New Alert"
                    color="#841584"
                    accessibilityLabel="Create New Alert"
                />
            </View>
            
        );
    }

    
}

const mapStateToProps = createStructuredSelector<AppState, IReduxStateProps>({
    countryList: selectCountryListData,
    cloudMessageToken: selectFirebaseToken,
    cmTokenId: selectFirebaseTokenId
});

export default connect(mapStateToProps)(Alerts);
