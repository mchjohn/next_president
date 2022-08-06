import React from 'react';
import { NativeBaseProvider } from 'native-base';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { AuthProvider } from '@contexts/AuthContext';
import { UserProvider } from '@contexts/UserContext';
import { ModalProvider } from '@contexts/ModalContext';

import { theme } from './src/global/styles/theme';

import { Navigation } from './src/routes';

const App = () => {
  return (
    <SafeAreaProvider>
      <NativeBaseProvider theme={theme}>
        <ModalProvider>
          <AuthProvider>
            <UserProvider>
              <Navigation />
            </UserProvider>
          </AuthProvider>
        </ModalProvider>
      </NativeBaseProvider>
    </SafeAreaProvider>
  );
};

export default App;
