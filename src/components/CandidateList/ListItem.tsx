import React, { useMemo } from 'react';
import { getDeviceId } from 'react-native-device-info';
import { Box, HStack, VStack, Avatar, Text, Spacer, Button } from 'native-base';

import { useCandidates } from '@hooks/useCandidates';

import { ICandidate } from '@src/constants/candidates';

type Props = {
  amountVotes: number;
  candidate: ICandidate;
};

export function ListItem({ amountVotes, candidate }: Props) {
  const { updatedCandidate } = useCandidates();

  const percentVotes = useMemo(() => {
    if (amountVotes > 0) {
      const percentage = candidate.qtdVotes / amountVotes;

      const percentageValue = (percentage * 100).toFixed(2);

      return percentageValue;
    } else {
      return 0;
    }
  }, [amountVotes, candidate.qtdVotes]);

  return (
    <Box borderBottomWidth="1" borderColor="gray.300" py="4" marginX="4">
      <HStack space={4} justifyContent="space-between" alignItems="center">
        <Avatar
          size="lg"
          source={{
            uri: candidate.avatar,
          }}
        >
          <Avatar.Badge bg="yellow.300" />
        </Avatar>
        <VStack>
          <Text color="gray.900" fontWeight="500" fontSize="md">
            {candidate.numberCandidate} - {candidate.name}
          </Text>
          <Text color="gray.600" bold fontSize="sm">
            {candidate.qtdVotes} Votos
          </Text>
          <Text color="gray.900" bold fontSize="sm">
            {percentVotes}%
          </Text>
          <Text color="gray.600" fontSize="sm">
            Partido: {candidate.party}
          </Text>
        </VStack>
        <Spacer />
        <Button
          size="lg"
          bg="green.600"
          isLoading={false}
          isLoadingText="Votando..."
          onPress={() =>
            updatedCandidate({
              candidateId: candidate.id,
              voterId: getDeviceId(),
              qtdVotes: candidate.qtdVotes,
            })
          }
        >
          VOTAR
        </Button>
      </HStack>
    </Box>
  );
}
