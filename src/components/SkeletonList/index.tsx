import React from 'react';
import { Center, Skeleton, VStack } from 'native-base';

export function SkeletonList() {
  const SkeletonItem = () => (
    <VStack
      w="100%"
      // maxW="400"
      borderBottomWidth="1"
      borderBottomColor="gray.200"
      space={8}
      overflow="hidden"
      rounded="md"
      flexDirection="row"
      py="6"
      px="4"
      accessibilityLabel="Carregando lista"
    >
      <Skeleton rounded="full" size="20" bg="gray.300" />
      <Skeleton.Text px="4" w="80%" endColor="gray.300" />
    </VStack>
  );
  return (
    <Center w="100%">
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
      <SkeletonItem />
    </Center>
  );
}
