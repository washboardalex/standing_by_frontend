import { createStackNavigator } from 'react-navigation-stack';
import {createAppContainer} from 'react-navigation'
import HomeScreen from '../screens/home-screen.component';
import Alerts from '../screens/alert-screen.component';


const screens = {
    Home: {
        screen: HomeScreen
    },
    Alerts: {
        screen: Alerts
    }
}

const HomeStack = createStackNavigator(screens);

const AppWithRoutes = createAppContainer(HomeStack);

export default AppWithRoutes;

