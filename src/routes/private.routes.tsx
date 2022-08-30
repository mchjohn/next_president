import React, { useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Icon } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import { Home } from '../screens/Home';
import { Comments } from '../screens/Comments';
import { AddComment } from '../screens/AddComment';

import { PropsNavigationBottom } from './Models';
import SplashScreen from 'react-native-splash-screen';

const { Navigator, Screen } = createBottomTabNavigator<PropsNavigationBottom>();

const options = {
  tabBarActiveTintColor: '#ffffff',
  tabBarInactiveTintColor: '#024221',
  headerShown: false,
  tabBarShowLabel: false,
  tabBarStyle: {
    height: 58,
    elevation: 0,
    backgroundColor: '#108B64',
  },
};

const screenIcon = (iconName: string, color: string, size: number) => {
  return <Icon as={<AntDesign name={iconName} />} size={size} color={color} />;
};

export function PrivateNavigation() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Navigator screenOptions={options} initialRouteName="Home">
      <Screen
        name="Home"
        component={Home}
        options={{ tabBarIcon: ({ color, size }) => screenIcon('home', color, size) }}
      />
      <Screen
        name="AddComment"
        component={AddComment}
        options={{
          tabBarIcon: ({ color }) => (
            <Icon as={<MaterialIcons name="add-circle" />} size={50} color={color} />
          ),
        }}
      />
      <Screen
        name="Comments"
        component={Comments}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Icon as={<MaterialIcons name="comment" />} size={size} color={color} />
          ),
        }}
      />
    </Navigator>
  );
}
