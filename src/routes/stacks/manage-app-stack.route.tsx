import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { navOptions } from '../options.route';
import TabNavigator from '../tabs.route';

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