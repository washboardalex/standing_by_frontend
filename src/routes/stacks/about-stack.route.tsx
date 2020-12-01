import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { navOptions } from '../options.route';
import AboutApp from '../../screens/about.component';

const Stack = createStackNavigator();

function AboutAppWithHeader() {
  return (
      <Stack.Navigator>
        <Stack.Screen 
            name='AboutApp' 
            component={AboutApp}
            options={navOptions}
        />
      </Stack.Navigator>
  );
}

export default AboutAppWithHeader;

