import { StyleSheet } from 'react-native';
import { appTextColour } from '../../utils/styles';

const styles = StyleSheet.create({
    searchBox: {
        color: appTextColour,
        borderColor: appTextColour,
    },
    searchBoxWrap: {
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        margin: 5, 
        borderRadius: 4, 
        borderStyle: 'dashed', 
        borderWidth: 2, 
        borderColor: appTextColour, 
        alignItems: 'center', 
        paddingRight: 5, 
        paddingLeft: 5
    }
});

export default styles;

