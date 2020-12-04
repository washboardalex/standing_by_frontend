import { MaterialTopTabBarProps } from "@react-navigation/material-top-tabs";
import React from "react";
import { View, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/Ionicons';
import { appTextColour } from '../../utils/styles';
import { container, icon } from './custom-tab-bar.styles';

const CustomTabBar : React.FC<MaterialTopTabBarProps> = ({ state, descriptors, navigation, position }) => {
    return (
        <View style={{ flexDirection: 'row' }}>
            {state.routes.map((route : any, index : number) => {
                const { options } = descriptors[route.key];
                const label =
                    options.tabBarLabel !== undefined
                    ? options.tabBarLabel
                    : options.title !== undefined
                    ? options.title
                    : route.name;
    
                const isFocused = state.index === index;
        
                const onPress = () => {
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });
        
                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name);
                    }
                };
    
                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };
    
                const inputRange = state.routes.map((_, i) => i);
                const opacity = Animated.interpolate(position, {
                    inputRange,
                    outputRange: inputRange.map(i => (i === index ? 1 : 0.5)),
                });
    
                return (
                    <TouchableOpacity
                        accessibilityRole="button"
                        accessibilityState={isFocused ? { selected: true } : {}}
                        accessibilityLabel={options.tabBarAccessibilityLabel}
                        testID={options.tabBarTestID}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        style={container}
                    >
                        <Animated.Text style={{ opacity, ...icon}}>
                            <Icon name={label === 'add' ? `${label}-circle-outline` : `${label}-outline`} size={40} color={appTextColour} />
                        </Animated.Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
}

export default CustomTabBar;