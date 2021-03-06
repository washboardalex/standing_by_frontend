import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import AppWithRoutes from './src/routes/root-drawer.route';
import store from './src/redux/store'



const App = () => (
    <Provider store={store}>
        <AppWithRoutes />
    </Provider>
);

export default App;

