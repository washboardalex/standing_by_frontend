import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        marginTop: 55,
        alignItems: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20 
    }
});

const { container, text } = styles;

const Header : React.FC = () => (
    <View style={container}> 
        <Text style={text}> Cryptocurrency App </Text>
    </View>
);

export default Header;
