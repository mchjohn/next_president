import React, { useState } from 'react';
import auth from '@react-native-firebase/auth';
import { Box, Container, Text, Button } from 'native-base';

import { useUserAuth } from '@hooks/useUserAuth';
import { __newUserIsLogged } from '../../services/app_center/analytics';

export function Header() {
  const [isLogout, setIsLogout] = useState(false);

  const { user } = useUserAuth();

  const logout = async () => {
    setIsLogout(true);

    try {
      await auth().signOut();

      __newUserIsLogged(user!, 'Header');
    } catch (err) {
      console.log(err);
    } finally {
      setIsLogout(false);
    }
  };

  return (
    <Box bg="green.600" alignItems="flex-start" p="4">
      <Container
        w="full"
        maxW="full"
        minW="full"
        flexDirection="row"
        alignItems="center"
        justifyContent="space-between"
      >
        <Box>
          <Text color="gray.50" fontSize="lg" fontWeight="semibold">
            Eleições 2022
          </Text>
          <Text color="gray.800" fontSize="md" fontWeight="semibold">
            02/10/2022
          </Text>
        </Box>

        {user ? (
          <Button
            size="xs"
            bg="green.800"
            isLoading={isLogout}
            isLoadingText="Saindo..."
            onPress={logout}
          >
            <Text color="gray.200" fontWeight="bold" fontSize="2xs">
              Sair
            </Text>
          </Button>
        ) : null}
      </Container>
      <Text fontSize="lg" fontWeight="medium" color="gray.50" textAlign="center" mt="4" w="full">
        Vote no próximo presidente do Brasil
      </Text>
    </Box>
  );
}
