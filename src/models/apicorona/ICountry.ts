import ICoordinate from './ICoordinate';
import IAggregateData from './IAggregateData';

interface ICountry {
    coordinates: ICoordinate,
    name: string,
    code: string,
    population: number | null,
    updated_at: string,
    today: {
        deaths: number | null,
        confirmed: number | null
    },
    latest_data: IAggregateData
}

export default ICountry;
