import React, { useMemo } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Toast from 'react-native-root-toast';

import Home from '../components/Home/Home';
import Post from '../components/Post/Post';
import Settings from '../components/Settings/Settings';
import { useConnection } from '../connection/ConnectionProvider';

const Tab = createBottomTabNavigator();

const RouteNavigator = () => {
  const { isConnected } = useConnection();

  const renderToaster = useMemo(() => {
    if (!isConnected) {
      return (
        <Toast
          visible={!isConnected}
          position={0}
          duration={Toast.durations.SHORT}
        >
          Offline mode !
        </Toast>
      );
    }

    return null;
  }, [isConnected]);

  return (
    <NavigationContainer>
      {renderToaster}
      <Tab.Navigator
        screenOptions={{ headerShown: false }}
      >
        <Tab.Screen
          name={'Home'}
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='home' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={'Post'}
          component={Post}
          options={{
            tabBarLabel: 'Post',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='plus-circle-outline' color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name={'Settings'}
          component={Settings}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name='cog-outline' color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RouteNavigator;
