import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Comments } from '../screens/Comments';

import { PropsNavigationStack } from './Models';

const { Navigator, Screen } = createNativeStackNavigator<PropsNavigationStack>();

export function PublicNavigation() {
  return (
    <Navigator initialRouteName="Comments">
      <Screen name="Comments" component={Comments} options={{ headerShown: false }} />
    </Navigator>
  );
}
