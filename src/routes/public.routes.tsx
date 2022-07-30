import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '../screens/SignIn';

import { PropsNavigationStack } from './Models';

const { Navigator, Screen } = createNativeStackNavigator<PropsNavigationStack>();

export function PublicNavigation() {
  return (
    <Navigator initialRouteName="SignIn">
      <Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
    </Navigator>
  );
}
