import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { navOptions } from './config/options.route';
import TabNavigator from './config/tabs.route';

const Stack = createStackNavigator();

function ManageAppWithHeader() {
  return (
      <Stack.Navigator>
        <Stack.Screen 
            name='ManageApp' 
            component={TabNavigator}
            options={navOptions}
        />
      </Stack.Navigator>
  );
}

export default ManageAppWithHeader;