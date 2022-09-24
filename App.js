import React, {useEffect} from 'react';
import {LogBox, StatusBar} from 'react-native';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';

import appReducer from './src/reducers';
import MainStackNavigator from './src/navigation/Navigation';
import FlashMessage from 'react-native-flash-message';

const store = createStore(appReducer, {}, applyMiddleware(thunk));

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

const App = () => {
  return (
    <Provider store={store}>
      <StatusBar
        translucent
        barStyle="light-content"
        backgroundColor="transparent"
      />
      <MainStackNavigator />
      <FlashMessage position="top" duration={4000} animationDuration={300} />
    </Provider>
  );
};

export default App;
