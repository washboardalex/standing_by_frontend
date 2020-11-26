import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import CountryStack from './stacks/country-stack.route';
import AlertStack from './stacks/alert-stack.route';


const RootDrawerNavigator = createDrawerNavigator({
    'My Active Alerts': {
        screen: AlertStack
    },
    'Data by Country': {
        screen: CountryStack
    }
});

const AppWithRoutes = createAppContainer(RootDrawerNavigator);

export default AppWithRoutes;