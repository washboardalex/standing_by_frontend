import { getUniqueId } from 'react-native-device-info';

export const covidApiUrl : string = 'https://api.covid19api.com';

export const adminUrl : string = 'https://covid-19-alerts-admin-staging.com.au';

export const headers = { 
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip',
};

export const deviceId : string = getUniqueId();

