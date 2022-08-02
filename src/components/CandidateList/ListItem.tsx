import React, { useMemo } from 'react';
import { Box, HStack, VStack, Text, Spacer, Button } from 'native-base';

import { useCandidates } from '@hooks/useCandidates';

import { ICandidate } from '@src/constants/candidates';

import { SignIn } from '@components/SignIn';
import { AvatarBadge } from '@components/AvatarBadge';

type Props = {
  amountVotes: number;
  candidate: ICandidate;
  voterId: string | null;
  candidatesPosition: number;
};

export function ListItem({ voterId, amountVotes, candidate, candidatesPosition }: Props) {
  const { isVoting, updatedCandidate } = useCandidates();

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
        <AvatarBadge uri={candidate.avatar} candidatesPosition={candidatesPosition} />
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

        {voterId ? (
          <Button
            size="md"
            bg="green.600"
            isLoading={isVoting}
            isLoadingText="Votando..."
            onPress={() =>
              updatedCandidate({
                voterId,
                candidateId: candidate.id,
                qtdVotes: candidate.qtdVotes,
              })
            }
          >
            VOTAR
          </Button>
        ) : (
          <SignIn />
        )}
      </HStack>
    </Box>
  );
}
