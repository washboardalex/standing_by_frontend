import { StyleSheet } from 'react-native';
import { appBackgroundColour, appBorderRadius, appBorderStyle, appBorderWidth, appTextColour } from '../../utils/styles';

const styles = StyleSheet.create({
    container:{
        flex: 1, 
        backgroundColor: appBackgroundColour
    },
    border: {
        flex: 1, 
        margin: 5, 
        borderColor: appTextColour, 
        borderWidth: appBorderWidth, 
        borderStyle: appBorderStyle, 
        borderRadius: appBorderRadius,
    },
    textWrap: {
        margin: 15
    },
    text: {
        color: appTextColour,
        textAlign: 'center'
    },
    textInput: {  
        height: 40,  
        fontSize: 16,
        marginLeft: 5,
        color: appTextColour,  
    },
    pickerWrap: {
        borderColor: appTextColour, 
        borderWidth: appBorderWidth, 
        borderStyle: appBorderStyle, 
        borderRadius: appBorderRadius,
        width: '80%',
        marginLeft: '10%'
    },
    picker: {
        color: appTextColour,
    },
    textInputWrap: {
        width: '80%',
        marginLeft: '10%',
        borderColor: appTextColour, 
        borderWidth: appBorderWidth, 
        borderStyle: appBorderStyle, 
        borderRadius: appBorderRadius,
        marginTop: 30
    },
    iconWrap: {
        marginTop: 30
    }
});

export const {
    container,
    border,
    text,
    textWrap,
    iconWrap,
    textInput,
    picker,
    pickerWrap,
    textInputWrap
} = styles;

