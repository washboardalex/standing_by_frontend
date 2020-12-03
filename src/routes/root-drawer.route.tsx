import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ManageApp from './stacks/manage-app-stack.route';
import AboutApp from './stacks/about-stack.route';
import { appBackgroundColour, appTextColour } from '../utils/styles';
import { color } from 'react-native-reanimated';

const RootDrawerNavigator = createDrawerNavigator(); 

const AppWithRoutes = () => (
    <NavigationContainer>
        <RootDrawerNavigator.Navigator 
            initialRouteName='Manage Alerts'
            drawerStyle={{
                backgroundColor: appBackgroundColour,
                width: 240,
            }}
            drawerContentOptions={{
                activeTintColor: appTextColour,
                activeBackgroundColor: '#4f5962',
                inactiveTintColor: appTextColour,
                inactiveBackgroundColor: appBackgroundColour
            }}
        >
            <RootDrawerNavigator.Screen 
                name='Manage Alerts' 
                component={ManageApp} 

            />
            <RootDrawerNavigator.Screen 
                name='About' 
                component={AboutApp} 
            />
        </RootDrawerNavigator.Navigator>
    </NavigationContainer>
);


export default AppWithRoutes;