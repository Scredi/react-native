/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

 import React from 'react';
 import { RootSiblingParent } from 'react-native-root-siblings';
 
 import ConnectionProvider from './connection/ConnectionProvider';
 import RouteNavigator from './navigators/RouteNavigator';

const App = () => {  
  return (
    <RootSiblingParent>
      <ConnectionProvider>
        <RouteNavigator/>
      </ConnectionProvider>
    </RootSiblingParent>
  );
};

export default App;
