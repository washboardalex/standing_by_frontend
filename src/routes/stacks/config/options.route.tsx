import Header from '../../../components/header.component';
import React from 'react';
import { appBackgroundColour, appTextColour } from '../../../utils/styles';
import Icon from 'react-native-vector-icons/Ionicons';

const renderHeader : React.FC = () => <Header />;

export const navOptions = ({navigation} : any) => {
    return {
        headerTitle: renderHeader,
        headerLeft: () => <Icon style={{marginLeft: 5}} name='menu-outline' color={appTextColour} size={32} onPress={() => navigation.openDrawer()}  />,
        headerStyle: {
            backgroundColor: appBackgroundColour,
            elevation: 0,
            shadowOpacity: 0,
            height: 75
        }
    };
}
