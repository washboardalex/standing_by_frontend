import * as React from 'react';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import Countries from '../../../screens/countries-screen.component';
import AddAlert from '../../../screens/create-alert.component';
import ActiveAlerts from '../../../screens/active-alerts.component';

const Tab = createMaterialTopTabNavigator();

const TabNavigator = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={ActiveAlerts} />
            <Tab.Screen name='Countries' component={Countries} />
            <Tab.Screen name='Add Alert' component={AddAlert} />
        </Tab.Navigator>
    );
}

export default TabNavigator;

