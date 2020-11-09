import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { renderIcon } from './coin-card.utils';
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
} from './coin-card.styles';


interface ICoinCardProps {
    symbol: string,
    priceUsd: number,
    changePercent24Hr: number,
    name: string,
    volumeUsd24Hr: number
}

const CoinCard : React.FC<ICoinCardProps> = ({ symbol, priceUsd, changePercent24Hr, name, volumeUsd24Hr }) => (
    
    <View style={container}>

        <View style={upperRow}>
            <Image
                style={image}
                source={ renderIcon(symbol) }
            />
            <Text style={coinSymbol}>{ symbol }</Text>
            <Text style={seperator}>|</Text>
            <Text style={coinName}>{ name }</Text>
            <Text style={coinPrice}>{ priceUsd }
            <Text style={moneySymbol}> $ </Text>
            </Text>
        </View>

        <View style={statisticsContainer}>

            <Text>
                24h:
                <Text style={changePercent24Hr < 0 ? percentChangeMinus : percentChangePlus }> {changePercent24Hr} % </Text>
            </Text>

            <Text>24h Vol:
                <Text> { volumeUsd24Hr } </Text>
            </Text>

        </View>

    </View> 
    

);

export default CoinCard;
