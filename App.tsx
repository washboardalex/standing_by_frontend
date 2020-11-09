import React from 'react';
import { Provider } from 'react-redux';
import AppWithRoutes from './src/routes/home-stack.route';


import store from './src/redux/store'

import Header from './src/components/header.component';



const App = () => (
    <Provider store={store}>
        <AppWithRoutes />
    </Provider>
);

export default App;

