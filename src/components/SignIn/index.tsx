import React from 'react';
import { Button, Popover } from 'native-base';

import { useAnonymousLogin } from '@hooks/useAnonymousLogin';

export function SignIn() {
  const { signInAnonymous } = useAnonymousLogin();

  return (
    <Popover
      trigger={triggerProps => {
        return (
          <Button {...triggerProps} colorScheme="green" size="md">
            VOTAR
          </Button>
        );
      }}
    >
      <Popover.Content accessibilityLabel="Login" w="56">
        <Popover.Arrow />
        <Popover.CloseButton />
        <Popover.Header _text={{ color: 'gray.700' }}>Para votar, faça login</Popover.Header>
        <Popover.Footer justifyContent="flex-end">
          <Button colorScheme="green" onPress={signInAnonymous}>
            Entrar
          </Button>
        </Popover.Footer>
      </Popover.Content>
    </Popover>
  );
}
