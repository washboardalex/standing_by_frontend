import ICoin from "../../models/coincap/ICoin";

const toFloatTwoDecimals = (numStr : string) => Math.round(parseFloat(numStr) * 100) / 100;

export const formatCoinData = (coinData : Array<any>) : Array<ICoin> => {
    return coinData.map((item : any) : ICoin => ({
        id: item.id,
        rank: parseInt(item.rank),
        symbol: item.symbol.toUpperCase(),
        name: item.name,
        supply: toFloatTwoDecimals(item.supply),
        maxSupply: toFloatTwoDecimals(item.maxSupply),
        marketCapUsd: toFloatTwoDecimals(item.marketCapUsd),
        volumeUsd24Hr: toFloatTwoDecimals(item.volumeUsd24Hr),
        priceUsd: toFloatTwoDecimals(item.priceUsd),
        changePercent24Hr: toFloatTwoDecimals(item.changePercent24Hr),
        vwap24Hr: toFloatTwoDecimals(item.vwap24Hr)
    }));
}
