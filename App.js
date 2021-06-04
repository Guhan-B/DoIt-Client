import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { enableScreens } from 'react-native-screens';

import store from './store/store';
import SplashScreen from './screens/Splash/Splash';
import AppNavigator from './navigation/AppNavigator';

enableScreens();

const startApp = async (callback) => {
  setTimeout(() => {
    console.log("Data loaded");
    callback();
  }, 2000);
}

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log("App started")
    startApp(() => {
      setIsLoading(false);
    });
  }, [])


  if (isLoading) {
    return <SplashScreen />
  }

  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

export default App;