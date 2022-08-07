/* eslint-disable react-native/no-inline-styles */
import React, { useEffect } from 'react';
import { FlashList } from '@shopify/flash-list';
import { Box, Container, Text } from 'native-base';

import { useComments } from '@hooks/useComments';

import { GlobalButton } from '@components/GlobalButton';

import { ListItem } from './ListItem';

export function Comments() {
  const { comments, getComments } = useComments();

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <Box flex={1}>
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
        </Container>
        <Text fontSize="lg" fontWeight="medium" color="gray.50" textAlign="center" mt="4" w="full">
          Veja o que as pessoas estão falando sobre essa eleição
        </Text>
      </Box>

      <FlashList
        data={comments}
        estimatedItemSize={326}
        contentContainerStyle={{ paddingBottom: 38 }}
        renderItem={({ item }) => <ListItem comment={item} />}
      />

      <GlobalButton />
    </Box>
  );
}
