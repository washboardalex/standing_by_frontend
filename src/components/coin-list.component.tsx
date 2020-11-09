import React from 'react';
import { Dispatch, AnyAction } from 'redux';
import { connect } from 'react-redux';
import { ScrollView } from 'react-native';
import { getCoinList } from '../redux/coinlist/coinlist.actions';
import { AppState } from '../redux/root-reducer';
import ICoin from '../models/coincap/ICoin';
import CoinCard from './coin-card/coin-card.component';

interface IDispatchProps {
    getCoinList: () => any
}

interface IStateProps {
    coinList: any
}

type CoinListProps = IDispatchProps &  IStateProps;

class CoinList extends React.Component<CoinListProps> {
    componentDidMount() {
        this.props.getCoinList();
    }

    render() {
        const { coinList } = this.props;

        return (
            <ScrollView>
                {coinList.data.map(( coin : ICoin, index : number ) => 
                    <CoinCard
                        key={index}    
                        name={coin.name}
                        symbol={coin.symbol}
                        priceUsd={coin.priceUsd}
                        changePercent24Hr={coin.changePercent24Hr}
                        volumeUsd24Hr={coin.volumeUsd24Hr}
                    />
                )}
            </ScrollView>
        )
    }
}

const mapStateToProps = (state : AppState) => ({ coinList: state.coinList })

const mapDispatchToProps =  (dispatch: Dispatch<AnyAction>) => ({
    getCoinList: () => dispatch<any>(getCoinList())
})

export default connect(mapStateToProps, mapDispatchToProps)(CoinList);

