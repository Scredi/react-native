import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Feed from './Fragments/Feed';
import Detail from './Fragments/Detail';

const Stack = createStackNavigator();

const Home = () => {
  return (
    <Stack.Navigator initialRouteName={'Feed'}>
      <Stack.Screen
        name={'Feed'}
        component={() => (
          <Feed />
        )}
      />
      <Stack.Screen
        name={'Detail'}
        component={() => (
          <Detail />
        )}
      />
    </Stack.Navigator>
  );
};

export default Home;
