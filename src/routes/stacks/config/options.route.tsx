import Header from '../../../components/header.component';
import React from 'react';
import {Button} from 'react-native';

const renderHeader : React.FC = () => <Header />;

export const navOptions = ({navigation} : any) => {
    return {
        headerTitle: renderHeader,
        headerLeft: () => <Button title={'menu'} onPress={() => navigation.openDrawer()} />
    };
}
