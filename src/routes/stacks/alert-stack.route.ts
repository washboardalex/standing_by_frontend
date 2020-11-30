import { createStackNavigator } from 'react-navigation-stack';
import AddAlert from '../../screens/create-alert.component';
import ActiveAlerts from '../../screens/active-alerts.component';
import { navOptions } from '../constants.route';


const screens = {
    ActiveAlerts: {
        screen: ActiveAlerts,
        navigationOptions: navOptions
    },
    AddAlert: {
        screen: AddAlert,
        navigationOptions: navOptions
    }
};

const Alerts = createStackNavigator(screens);

export default Alerts;

