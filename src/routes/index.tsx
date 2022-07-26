import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { PublicNavigation } from './public.routes';
import { PrivateNavigation } from './private.routes';

export function Navigation() {
  const user = true;

  function getNavigation() {
    if (user) {
      return <PublicNavigation />;
    }
    return <PrivateNavigation />;
  }

  return <NavigationContainer>{getNavigation()}</NavigationContainer>;
}
