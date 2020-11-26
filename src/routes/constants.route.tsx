import Header from '../components/header.component';
import React from 'react';
import {Button} from 'react-native';

const renderHeader : React.FC = () => <Header />;


export const navOptions = ({navigation} : any) => {
    return {
        headerTitle: renderHeader,
        headerRight: () => <Button title={'+ New Alert'} onPress={() => navigation.navigate('AddAlert')} />,
        headerLeft: () => <Button title={'menu'} onPress={() => navigation.openDrawer()} />
    };
}