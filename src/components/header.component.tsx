import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 1
    }
});

const { container, text } = styles;



const Header : React.FC = () => (
    <View style={container}> 
        <View>
            <Text style={text}> Covid19 App </Text>
        </View>
    </View>
);

export default Header;
