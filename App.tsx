import React from 'react';
import { NativeBaseProvider } from 'native-base';

import { theme } from './src/global/styles/theme';

import { Navigation } from './src/routes';

const App = () => {
  return (
    <NativeBaseProvider theme={theme}>
      <Navigation />
    </NativeBaseProvider>
  );
};

export default App;
