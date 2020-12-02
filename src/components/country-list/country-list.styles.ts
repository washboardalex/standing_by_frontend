import { StyleSheet } from 'react-native';
import { appTextColour,  appBorderStyle, appBorderWidth, appBorderRadius } from '../../utils/styles';

const styles = StyleSheet.create({
    searchBox: {
        color: appTextColour,
        borderColor: appTextColour,
    },
    searchBoxWrap: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        margin: 5, 
        borderRadius: appBorderRadius, 
        borderStyle: appBorderStyle, 
        borderWidth: appBorderWidth, 
        borderColor: appTextColour, 
        alignItems: 'center', 
        paddingRight: 5, 
        paddingLeft: 5
    }
});

export const { searchBox, searchBoxWrap } = styles;

