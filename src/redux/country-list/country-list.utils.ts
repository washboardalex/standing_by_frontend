import ICountrySummary from "../../models/covidapi/ICountrySummary";

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

    let newCountries = countries.sort(function(a, b) {
        return b.newConfirmed - a.newConfirmed;
    });

    let australia = newCountries.filter(function(country) {
        return country.countryCode === 'AU';
    })[0];

    newCountries = newCountries.filter(function(country) {
        return country.countryCode !== 'AU';
    });

    newCountries.unshift(australia);

    return newCountries;
}

export const sortCountriesAlphabetical = (countries : Array<ICountrySummary>) : Array<ICountrySummary> => {
    let newCountries = countries.sort(function(a, b) {
        if(a.country < b.country) { return -1; }
        if(a.country > b.country) { return 1; }
        return 0;
    });

    let australia = newCountries.filter(function(country) {
        return country.countryCode === 'AU';
    })[0];

    newCountries = newCountries.filter(function(country) {
        return country.countryCode !== 'AU';
    });

    newCountries.unshift(australia);

    return newCountries;
}

