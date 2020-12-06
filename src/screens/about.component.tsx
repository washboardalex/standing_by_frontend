import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { appBackgroundColour, appTextColour } from '../utils/styles';
import { developerEmail } from '../utils/constants';

interface IReactNavigationProps {
    navigation: any
}

const styles = StyleSheet.create({
    paragraph: {
        color: appTextColour, 
        marginLeft: 5, 
        fontSize: 18
    }
})

const AboutApp : React.FC<IReactNavigationProps> = ({navigation}) => (
    <View style={{ flex: 1, backgroundColor: appBackgroundColour}}>
        <Text style={styles.paragraph}>
            This app allows you to passively track the progress of Coronavirus in any country, by alerting you when daily cases or deaths reach a certain number.
        </Text>
        <Text></Text>
        <Text style={styles.paragraph}>
            Data is taken from John Hopkins University, updated daily. With sufficient demand, more data sources will be incorporated in future updates.
        </Text>
        <Text></Text>
        <Text style={styles.paragraph}>
            For bugs or suggested improvements, please contact the developer on {developerEmail}.
        </Text>
    </View>
);

export default AboutApp;

