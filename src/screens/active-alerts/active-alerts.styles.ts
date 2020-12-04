import { StyleSheet } from 'react-native';
import { appBackgroundColour, appTextColour } from '../../utils/styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: appBackgroundColour,
        color: appTextColour
    },
    noAlerts: {
        flex: .4,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: appTextColour,
        fontSize: 32,
        marginBottom: 15
    }
});

export default styles;