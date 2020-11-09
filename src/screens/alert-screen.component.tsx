import React from 'react';
import { View, Text, TextInput, StyleSheet, Button } from 'react-native';
import {Picker} from '@react-native-community/picker';
import { createStructuredSelector } from 'reselect';
import axios, { AxiosResponse, AxiosError } from 'axios';
import { connect } from 'react-redux';
import { headers, adminUrl } from '../utils/constants';
import { selectCoinListData } from '../redux/coinlist/coinlist.selectors';
import { selectFirebaseToken } from '../redux/alerts/alerts.selectors';
import { AppState } from '../redux/root-reducer';
import ICoin from '../models/coincap/ICoin';
import { IAlert, AlertCondition } from 'src/models/admin/IAlert';



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
    coinList: Array<ICoin>,
    cloudMessageToken : string | null
}

interface ILocalState {
    selectedCoin: string,
    condition: AlertCondition,
    value: number
}

class Alerts extends React.Component<IReduxStateProps, ILocalState> { 
    
    state : ILocalState = {
        selectedCoin: 'BTC',
        condition: 'greaterThan',
        value: 0
    }

    createNewAlert = () => {

        console.log('yes this is happening');

        const { selectedCoin, condition, value } = this.state;

        const newAlert : IAlert = {
            condition: condition,
            value: value,
            type: 'price',
            coin: selectedCoin,
            
        }

        axios({
            method: 'post',
            url: `${adminUrl}/alert`,
            headers: headers,
            data: { 
                newAlert,
                token: this.props.cloudMessageToken
            }
        })
        .then((response : AxiosResponse) => console.log(response))
        .catch((error : AxiosError) => {
            console.error(error);
        });
    }
    
    render() {
        const { coinList } = this.props;

        return (
            <View style={{flex: 1}}>
                <Text>Alert me when the value of</Text>
                <Picker
                    selectedValue={this.state.selectedCoin}
                    onValueChange={(itemValue, itemIndex) => this.setState({selectedCoin: itemValue.toString()}) }
                >
                    {coinList.map((item: ICoin) => 
                        <Picker.Item label={`${item.name} (${item.symbol})`} value={item.symbol} /> 
                    )}
                </Picker>
                <Text>is</Text>
                <Picker
                    selectedValue={this.state.condition}
                    onValueChange={(itemValue, itemIndex) => this.setState({condition: itemValue.toString() as AlertCondition})}
                >
                    <Picker.Item label='Greater than' value='greaterThan' /> 
                    <Picker.Item label='Less than' value='lessThan' />
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
    coinList: selectCoinListData,
    cloudMessageToken: selectFirebaseToken
});

export default connect(mapStateToProps)(Alerts);
