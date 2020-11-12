import ICountrySummary from "src/models/covidapi/ICountrySummary";

export const formatCountries = (data : Array<any>) : Array<ICountrySummary> => {
    return data.map((item: any) : ICountrySummary => ({
        country: item.Country,
        countryCode: item.CountryCode,
        slug: item.Slug,
        newConfirmed: item.NewConfirmed,
        newDeaths: item.NewDeaths,
        totalDeaths: item.TotalDeaths,
        newRecovered: item.NewRecovered,
        totalRecovered: item.TotalRecovered,
        date: item.Date,
        premium: item.Premiums
    }));
}

export const sortCountriesByDailyConfirmed = (countries : Array<ICountrySummary>) : Array<ICountrySummary> => {
    const newCountries = countries.sort(function(a, b) {
        return b.newConfirmed - a.newConfirmed;
    });

    

    return newCountries;
}



