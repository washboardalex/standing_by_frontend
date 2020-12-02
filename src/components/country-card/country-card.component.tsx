import React from 'react';
import { View, Text, Image } from 'react-native';
import { renderIcon } from './country-card.utils';
import { 
    border,
    container,
    image,
    imageColumn,
    textColumn,
    headingWrap,
    heading,
    dataWrap,
    dataColumn,
    dataHeadingText,
    dataText
} from './country-card.styles';


interface ICountrySummaryCardProps {
    name: string,
    newDeaths: number,
    newConfirmed: number,
    slug: string
}

const CountryCard : React.FC<ICountrySummaryCardProps> = ({ newDeaths, newConfirmed, name, slug }) => (
    <View style={border}>
        <View style={container}>

            <View style={imageColumn}>
                <Image
                    style={image}
                    source={ renderIcon(slug) }
                />
            </View>
            <View style={textColumn}>
                <View style={headingWrap}>
                    <Text style={heading}>
                        {name}
                    </Text>
                </View>
                <View style={dataWrap}>
                    <View style={dataColumn}>
                            <Text style={dataHeadingText}>New Cases</Text>
                            <Text style={dataText}>{ newConfirmed }</Text>
                    </View>
                    <View style={dataColumn}>
                        <Text style={dataHeadingText}>New Deaths</Text>
                        <Text style={dataText}>{ newDeaths }</Text>
                    </View>
                </View>
            </View>
        </View> 
    </View>
);

export default CountryCard;
