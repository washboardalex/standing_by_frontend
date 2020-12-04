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
            This app is designed for time poor individuals or those who need to keep track of coronavirus numbers in countries not typically covered by Australian news.
        </Text>
        <Text></Text>
        <Text style={styles.paragraph}>
            Data is taken from John Hopkins University, and is updated every few days. With sufficient demand, more data sources will be incorporated in future updates.
        </Text>
        <Text></Text>
        <Text style={styles.paragraph}>
            For bugs or suggested improvements, please contact the developer on {developerEmail}.
        </Text>
    </View>
);

export default AboutApp;

