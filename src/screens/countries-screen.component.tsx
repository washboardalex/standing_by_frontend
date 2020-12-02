import React from 'react';
import { View } from 'react-native';
import { appBackgroundColour } from '../utils/styles';

import CountryList from '../components/country-list/country-list.component';

const Countries : React.FC = () => (
    <View style={{ flex: 1, backgroundColor: appBackgroundColour }}>
        <CountryList />
    </View>
);

export default Countries;

