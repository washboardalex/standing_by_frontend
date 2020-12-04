import * as React from 'react';

import { createMaterialTopTabNavigator, MaterialTopTabBarProps } from '@react-navigation/material-top-tabs';
import Countries from '../../../screens/countries-screen.component';
import AddAlert from '../../../screens/create-alert/create-alert.component';
import ActiveAlerts from '../../../screens/active-alerts/active-alerts.component';
import MyTabBar from '../../../components/custom-tab-bar/custom-tab-bar.component';

const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator tabBar={(props : MaterialTopTabBarProps) => <MyTabBar {...props} />} >
            <Tab.Screen name='home' component={ActiveAlerts} />
            <Tab.Screen name='earth' component={Countries} />
            <Tab.Screen name='add' component={AddAlert} />
        </Tab.Navigator>
    );
}

export default TabNavigator;

