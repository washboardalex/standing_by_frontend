import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { navOptions } from './config/options.route';
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

