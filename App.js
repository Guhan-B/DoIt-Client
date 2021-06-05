import React, { } from 'react';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';

import store from './store/store';
import AppNavigator from './navigation/AppNavigator';


enableScreens();

const App = () => {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;