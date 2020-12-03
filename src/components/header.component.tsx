import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import { appBorderRadius, appBorderStyle, appBorderWidth, appTextColour } from '../utils/styles';

const icon = () => require(`../assets/logo.png`);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
});

const { container } = styles;



const Header : React.FC = () => (
    <View style={container}> 
        <View style={{ borderWidth: appBorderWidth, borderRadius: appBorderRadius, borderColor: appTextColour, borderStyle: appBorderStyle}}>
            <Image
                style={{height: 50, aspectRatio: 1, margin: 5}}
                source={ icon() }
            />
        </View>
    </View>
);

export default Header;
