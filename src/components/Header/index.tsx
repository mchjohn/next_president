import React from 'react';
import { Box, Container, Text } from 'native-base';

export function Header() {
  return (
    <Box bg="green.600" alignItems="flex-start" p="4">
      <Container w="full" maxW="full" minW="full">
        <Text color="gray.50" fontSize="lg" fontWeight="semibold">
          Eleições 2022
        </Text>
        <Text color="gray.800" fontSize="md" fontWeight="semibold">
          02/10/2022
        </Text>

        <Text fontSize="lg" fontWeight="medium" color="gray.50" textAlign="center" mt="4" w="full">
          Vote no próximo presidente do Brasil
        </Text>
      </Container>
    </Box>
  );
}
