import { createStackNavigator } from 'react-navigation-stack';
import Countries from '../../screens/countries-screen.component';
import AddAlert from '../../screens/alert-screen.component';
import { navOptions } from '../constants.route';


const screens = {
    Countries: {
        screen: Countries,
        navigationOptions: navOptions
    },
    AddAlert: {
        screen: AddAlert,
        navigationOptions: navOptions
    }
};

const CountryStack = createStackNavigator(screens);

export default CountryStack;