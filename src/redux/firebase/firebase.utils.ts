import messaging from '@react-native-firebase/messaging';


export const getToken = async () => {
    try {
        const token = await messaging().getToken();
        if (token) return token;
    } catch (error) {
        console.error(error);
    }
};
  



