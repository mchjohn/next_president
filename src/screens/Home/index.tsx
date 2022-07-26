import React from 'react';
import { NativeBaseProvider, Box } from 'native-base';

export function Home() {
  return (
    <NativeBaseProvider>
      <Box>Hello world</Box>
    </NativeBaseProvider>
  );
}
