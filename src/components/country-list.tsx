import React from 'react';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { getCountryList } from '../redux/country-list/country-list.actions';
import { AppState } from '../redux/root-reducer';
import ICountry from '../models/apicorona/ICountry';
import CountryCard from './country-card/country-card.component';

interface IDispatchProps {
    getCountryList: () => any
}

interface IStateProps {
    countryList: any
}

type CountryListProps = IDispatchProps &  IStateProps;

class CountryList extends React.Component<CountryListProps> {
    componentDidMount() {
        this.props.getCountryList();
    }

    render() {
        const { countryList } = this.props;

        return (
            <ScrollView>
                {countryList.data.map(( country : ICountry, index : number ) => 
                    <CountryCard
                        key={index}    
                        name={country.name}
                        deathsToday={country.today.deaths ? country.today.deaths : 0}
                        confirmedToday={country.today.confirmed ? country.today.confirmed : 0}
                    />
                )}
            </ScrollView>
        )
    }
}

const mapStateToProps = (state : AppState) => ({ countryList: state.countryList })

const mapDispatchToProps =  (dispatch: Dispatch<AnyAction>) => ({
    getCountryList: () => dispatch<any>(getCountryList())
})

export default connect(mapStateToProps, mapDispatchToProps)(CountryList);

