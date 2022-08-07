import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { PrivateNavigation } from './private.routes';

export function Navigation() {
  return (
    <NavigationContainer>
      <PrivateNavigation />
    </NavigationContainer>
  );
}
