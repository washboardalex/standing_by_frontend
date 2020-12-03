import { StyleSheet } from 'react-native';
import {appTextColour, appBorderStyle, appBorderWidth, appBorderRadius} from '../../utils/styles';

const styles = StyleSheet.create({
    border: {
        borderBottomColor: appTextColour,
        borderBottomWidth: 2,
        alignItems: 'center'
    },
    container: {
        flexDirection: 'row',
        minHeight: 190,
        marginLeft: 5,
        marginRight: 5
    },
    imageColumn: {
        flexDirection: 'row',
        marginBottom: 15,
        width: '30%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    textColumn: {
        width: '70%'
    },
    headingWrap: {
        alignItems: 'center',
    },
    heading: {
        fontSize: 24,
        fontWeight: '600',
        color: appTextColour,
        textAlign: 'center'
    },
    dataWrap: {
        borderStyle: appBorderStyle,
        borderWidth: appBorderWidth,
        borderRadius: appBorderRadius,
        borderColor: appTextColour,
        margin: 20,
        marginBottom: 10,
        padding: 10
    },
    dataColumn: {
        width: '50%'
    },
    dataHeadingText: {
        textAlign: 'center',
        color: appTextColour,
        fontWeight: '600'
    },
    dataText: {
        textAlign: 'center',
        color: appTextColour,
    },
    image: {
        width: '100%',
        aspectRatio: 1
    },
    delIcon: {
        textAlign: 'right', 
        marginRight: '5%',
        marginBottom: 15
    }
});

export const { 
    border,
    container,
    image,
    imageColumn,
    textColumn,
    headingWrap,
    heading,
    dataWrap,
    dataColumn,
    dataHeadingText,
    dataText,
    delIcon
} = styles;
