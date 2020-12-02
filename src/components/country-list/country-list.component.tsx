import React, { Fragment } from 'react';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { FlatList, TextInput, View } from 'react-native';
import { getCountryList } from '../../redux/country-list/country-list.actions';
import { AppState } from '../../redux/root-reducer';
import { SearchableFlatList } from 'react-native-searchable-list';
import ICountrySummary from '../../models/covidapi/ICountrySummary';
import CountryCard from '../country-card/country-card.component';
import  { searchBox, searchBoxWrap }  from './country-list.styles';
import Icon from 'react-native-vector-icons/Ionicons';
import { appTextColour } from '../../utils/styles';

interface IDispatchProps {
    getCountryList: () => any
}

interface IStateProps {
    countryList: any,
}

interface ILocalState {
    searchTerm: string
}

type CountryListProps = IDispatchProps &  IStateProps & ILocalState;

class CountryList extends React.Component<CountryListProps> {

    state : ILocalState = {
        searchTerm: ''
    }

    componentDidMount() {
        const { countryList } = this.props;

        if (!countryList.length){
            this.props.getCountryList();
        }
        
    }

    renderItem = ({ item } : any) => (
        <CountryCard
            name={item.country}
            newDeaths={item.newDeaths}
            newConfirmed={item.newConfirmed}
            slug={item.slug}
        />
    );

    render() {
        const { countryList } = this.props;

        return  (
            <>
                <View style={searchBoxWrap}>
                    <TextInput
                        style={searchBox}
                        placeholder={'Filter by country...'}
                        onChangeText={searchTerm => this.setState({ searchTerm })} 
                        placeholderTextColor={appTextColour}
                    />
                    <Icon name='search-outline' color={appTextColour} size={32} />
                </View>
                <SearchableFlatList
                    data={countryList.data}
                    searchTerm={this.state.searchTerm}
                    searchAttribute={'country'}
                    ignoreCase={true}
                    renderItem={this.renderItem}
                    keyExtractor={(item : ICountrySummary) => item.countryCode }
                />
            </>
        );
    }
}

const mapStateToProps = (state : AppState) => ({ countryList: state.countryList })

const mapDispatchToProps =  (dispatch: Dispatch<AnyAction>) => ({
    getCountryList: () => dispatch<any>(getCountryList())
});

export default connect(mapStateToProps, mapDispatchToProps)(CountryList);

