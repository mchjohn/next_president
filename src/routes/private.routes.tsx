import React, { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Home } from '../screens/Home';
import { Comments } from '../screens/Comments';

import { PropsNavigationStack } from './Models';
import SplashScreen from 'react-native-splash-screen';

const { Navigator, Screen } = createNativeStackNavigator<PropsNavigationStack>();

export function PrivateNavigation() {
  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <Navigator>
      <Screen name="Home" component={Home} options={{ headerShown: false }} />
      <Screen name="Comments" component={Comments} options={{ headerShown: false }} />
    </Navigator>
  );
}
