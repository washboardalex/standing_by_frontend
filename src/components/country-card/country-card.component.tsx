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


interface ICountryCardProps {
    name: string,
    deathsToday: number,
    confirmedToday: number,
}

const CountryCard : React.FC<ICountryCardProps> = ({ deathsToday, confirmedToday, name }) => (
    
    <View style={container}>

        <View style={upperRow}>
            {/* <Image
                style={image}
                source={ renderIcon(symbol) }
            /> */}
            <Text style={coinSymbol}>{ deathsToday } deaths</Text>
            <Text style={seperator}>|</Text>
            <Text style={coinName}>{ confirmedToday } new confirmed</Text>
            <Text style={coinPrice}>{ name }
                <Text style={moneySymbol}> $ </Text>
            </Text>
        </View>
{/* 
        <View style={statisticsContainer}>

            <Text>
                24h:
                <Text style={changePercent24Hr < 0 ? percentChangeMinus : percentChangePlus }> {changePercent24Hr} % </Text>
            </Text>

            <Text>24h Vol:
                <Text> { volumeUsd24Hr } </Text>
            </Text>

        </View> */}

    </View> 
    

);

export default CountryCard;
