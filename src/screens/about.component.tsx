import React from 'react';
import { View, Button, Text } from 'react-native';

import CountryList from '../components/country-list.component';

interface IReactNavigationProps {
    navigation: any
}

const AboutApp : React.FC<IReactNavigationProps> = ({navigation}) => (
    <View style={{ flex: 1 }}>
        <Text>
            This is the about page I guess.
        </Text>
    </View>
);

export default AboutApp;

