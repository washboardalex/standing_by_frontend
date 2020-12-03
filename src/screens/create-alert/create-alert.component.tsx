import React from 'react';
import { View, Text, TextInput, NativeTouchEvent, NativeSyntheticEvent, ToastAndroid } from 'react-native';
import {Picker} from '@react-native-community/picker';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { selectCountriesAlphabetical } from '../../redux/country-list/country-list.selectors';
import { selectFirebaseToken, selectFirebaseTokenId } from '../../redux/firebase/firebase.selectors';
import { selectNewAlertFlow } from '../../redux/alerts/alerts.selectors';
import { AppState } from '../../redux/root-reducer';
import ICountrySummary from '../../models/covidapi/ICountrySummary';
import { AlertCondition, AlertType } from '../../models/admin/IAlert';
import { getCountryList } from '../../redux/country-list/country-list.actions';
import { AnyAction, Dispatch } from 'redux';
import { createNewAlert, resetCreateAlertFlow } from '../../redux/alerts/alerts.actions';
import { fArgReturn } from '../../utils/types';
import Icon from 'react-native-vector-icons/Ionicons';
import { appTextColour } from '../../utils/styles';
import { AlertFlow } from 'src/redux/alerts/alerts.reducer';
import { ScrollView } from 'react-native-gesture-handler';
import { 
    container, 
    border, 
    text, 
    textWrap,
    textInput, 
    picker, 
    pickerWrap,
    textInputWrap,
    iconWrap
} from './create-alert.styles';



interface IReduxStateProps {
    countryList: Array<ICountrySummary>,
    cloudMessageToken : string | null,
    fcmTokenId: number | null,
    alertFlow: AlertFlow
}

interface IDispatchProps {
    createNewAlert: fArgReturn,
    getCountryList: fArgReturn,
    resetCreateAlertFlow: fArgReturn
}

type AddAlertProps = IReduxStateProps & IDispatchProps;

interface ILocalState {
    selectedCountryCode: string,
    selectedCountrySlug: string,
    condition: AlertCondition,
    type: AlertType
    value: number
}

class AddAlert extends React.Component<AddAlertProps, ILocalState> { 
    
    state : ILocalState = {
        selectedCountryCode: 'US',
        selectedCountrySlug: 'united-states',
        condition: 'greaterThan',
        type: 'newConfirmed',
        value: 0
    }

    componentDidMount () {
        const { countryList, getCountryList } = this.props;

        if (!countryList.length){
            getCountryList();
        }   
    }

    componentDidUpdate() {

        const { alertFlow, resetCreateAlertFlow } = this.props

        if (alertFlow === 'success') {
            console.log('should be resetting alert flow here')
            resetCreateAlertFlow();

            ToastAndroid.showWithGravity(
                'Alert added successfully',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }

        if (alertFlow === 'failure') {
            resetCreateAlertFlow();

            ToastAndroid.showWithGravity(
                'There was a problem adding your alert, please try again later',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
        }
    }
 
    
    generateIcon = () => {
        const { selectedCountryCode, condition, type, value, selectedCountrySlug } : ILocalState = this.state;
        const { alertFlow, cloudMessageToken, fcmTokenId, createNewAlert } : AddAlertProps = this.props;

        if (alertFlow === 'pending') 
            return <Icon
                name={'hourglass-outline'}
                color={appTextColour}
                size={128}
                style={{textAlign: 'center'}}
                accessibilityLabel="Create New Alert"
            />;

        return <Icon
            name={'add-circle-outline'}
            onPress={(e : NativeSyntheticEvent<NativeTouchEvent>) => createNewAlert(selectedCountryCode, condition, value, type, cloudMessageToken, fcmTokenId, selectedCountrySlug)}
            color={appTextColour}
            size={128}
            style={{textAlign: 'center'}}
            accessibilityLabel="Create New Alert"
        />
    }
    
    render() {
        const { countryList } = this.props;

        return (
            <ScrollView style={container}>
                <View style={border}>
                    <View style={{margin: 5}}>

                        <View style={textWrap}>
                            <Text style={text}>Alert me when</Text>
                        </View>

                        <View style={pickerWrap}>
                            <Picker
                                selectedValue={this.state.type}
                                onValueChange={(itemValue : any, itemIndex) => this.setState({type: itemValue as AlertType}) }
                                style={picker}
                            >
                                <Picker.Item label='new confirmed cases' value='newConfirmed' /> 
                                <Picker.Item label='new confirmed deaths' value='newDeaths' />
                            </Picker>
                        </View>
                        
                        <View style={textWrap}>
                            <Text style={text}>in</Text>
                        </View>

                        <View style={pickerWrap}>
                            <Picker
                                selectedValue={`${this.state.selectedCountryCode}.${this.state.selectedCountrySlug}`}
                                onValueChange={(itemValue, itemIndex) => {
                                    const countryInfoArr : Array<string> = itemValue.toString().split('.');
                                    this.setState({
                                        selectedCountryCode: countryInfoArr[0],
                                        selectedCountrySlug: countryInfoArr[1]
                                    }); 
                                }}
                                style={picker}
                            >
                                {countryList.map((item: ICountrySummary) => 
                                    <Picker.Item label={`${item.country} (${item.countryCode})`} value={`${item.countryCode}.${item.slug}`} /> 
                                )}
                            </Picker>
                        </View>
                        
                        <View style={textWrap}>
                            <Text style={text}>are</Text>
                        </View>

                        <View style={pickerWrap}>
                            <Picker
                                selectedValue={this.state.condition}
                                onValueChange={(itemValue, itemIndex) => this.setState({condition: itemValue.toString() as AlertCondition})}
                                style={picker}
                            >
                                <Picker.Item label='greater than' value='greaterThan' /> 
                                <Picker.Item label='less than' value='lessThan' />
                            </Picker>
                        </View>

                        <View style={textInputWrap}>
                            <TextInput  
                                onChangeText={text => this.setState({ value: Number(text) })}
                                placeholder='0'
                                underlineColorAndroid={'rgba(0,0,0,0)'}
                                style={{...textInput}}
                                keyboardType={'numeric'}
                                placeholderTextColor={appTextColour}
                            />  
                        </View>

                        
                        <View style={iconWrap}>
                            {this.generateIcon()}
                        </View>
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const mapStateToProps = createStructuredSelector<AppState, IReduxStateProps>({
    countryList: selectCountriesAlphabetical,
    cloudMessageToken: selectFirebaseToken,
    fcmTokenId: selectFirebaseTokenId,
    alertFlow: selectNewAlertFlow
});

const mapDispatchToProps =  (dispatch: Dispatch<AnyAction>) => ({
    createNewAlert: (country : string, condition : AlertCondition, value : number, type : AlertType, cloudMessageToken : null | string, fcmTokenId : null | number, countrySlug : string) => 
            dispatch<any>(createNewAlert(country, condition, value, type, cloudMessageToken, fcmTokenId, countrySlug)),
    getCountryList: () => dispatch<any>(getCountryList()),
    resetCreateAlertFlow: () => dispatch(resetCreateAlertFlow())
})

export default connect(mapStateToProps, mapDispatchToProps)(AddAlert);
