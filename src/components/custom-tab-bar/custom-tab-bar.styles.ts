import {StyleSheet} from 'react-native';
import { appBackgroundColour, appBorderWidth, appTextColour } from '../../utils/styles';

const styles = StyleSheet.create({
    container: { 
        flex: 1, 
        height: 60, 
        backgroundColor: appBackgroundColour
    },
    icon: {
        height: '100%', 
        borderBottomColor: appTextColour, 
        borderBottomWidth: appBorderWidth, 
        textAlign: 'center', 
        paddingTop: 10
    }
});

export const {
    container,
    icon
} = styles;