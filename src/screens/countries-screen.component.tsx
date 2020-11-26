import React from 'react';
import { View, Button } from 'react-native';

import CountryList from '../components/country-list.component';

interface IReactNavigationProps {
    navigation: any
}

const Countries : React.FC<IReactNavigationProps> = ({navigation}) => (
    <View style={{ flex: 1 }}>
        <CountryList />
    </View>
);

export default Countries;

