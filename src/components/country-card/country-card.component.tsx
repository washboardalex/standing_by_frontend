import React from 'react';
import { View, Text, Image } from 'react-native';
import { renderIcon } from './country-card.utils';
import { 
    container,
    image,
    moneySymbol,
    upperRow,
    coinSymbol,
    coinName,
    coinPrice,
    statisticsContainer,
    seperator,
    percentChangePlus,
    percentChangeMinus
} from './country-card.styles';


interface ICountrySummaryCardProps {
    name: string,
    newDeaths: number,
    newConfirmed: number,
    slug: string
}

const CountryCard : React.FC<ICountrySummaryCardProps> = ({ newDeaths, newConfirmed, name }) => (
    
    <View style={container}>

        <View style={upperRow}>
            {/* <Image
                style={image}
                source={ renderIcon(symbol) }
            /> */}
            <Text style={coinSymbol}>{ newDeaths } deaths</Text>
            <Text style={seperator}>|</Text>
            <Text style={coinName}>{ newConfirmed } new confirmed</Text>
            <Text style={coinPrice}>{ name }
                <Text style={moneySymbol}> $ </Text>
            </Text>
        </View>
    </View> 
);

export default CountryCard;
