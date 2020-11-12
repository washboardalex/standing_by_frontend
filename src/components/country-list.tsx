import React from 'react';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { getCountryList } from '../redux/country-list/country-list.actions';
import { AppState } from '../redux/root-reducer';
import ICountrySummary from '../models/covidapi/ICountrySummarySummary';
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

        return  (
            <ScrollView>
                {countryList.data.map(( country : ICountrySummary, index : number ) => 
                    <CountryCard
                        key={index}    
                        name={country.country}
                        newDeaths={country.newDeaths}
                        newConfirmed={country.newConfirmed}
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

