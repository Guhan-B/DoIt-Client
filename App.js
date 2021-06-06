import React, { } from 'react';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';

import store from './store/store';
import AppNavigator from './navigation/AppNavigator';
import SplashScreen from 'react-native-splash-screen';


enableScreens();

const App = () => {
  console.log("app");
  // SplashScreen.hide();
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;