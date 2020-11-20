import { getUniqueId } from 'react-native-device-info';

export const covidApiUrl : string = 'https://api.covid19api.com';

export const adminUrl : string = 'http://10.0.2.2:3001';

export const headers = { 
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip',
};

export const deviceId : string = getUniqueId();

