import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import ManageApp from './stacks/manage-app-stack.route';
import AboutApp from './stacks/about-stack.route';

const RootDrawerNavigator = createDrawerNavigator(); 

const AppWithRoutes = () => (
    <NavigationContainer>
        <RootDrawerNavigator.Navigator initialRouteName='Manage Alerts'>
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