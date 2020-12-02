import { getUniqueId } from 'react-native-device-info';
import { AppHeaders } from './types';

export const covidApiUrl : string = 'https://api.covid19api.com';
export const adminUrl : string = 'http://10.0.2.2:3001';
export const headers : AppHeaders = { 
    'Content-Type': 'application/json',
    'Accept-Encoding': 'gzip',
};
export const deviceId : string = getUniqueId();
