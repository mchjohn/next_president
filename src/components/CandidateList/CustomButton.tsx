import React from 'react';
import { Button } from 'native-base';

import { useCandidates } from '@hooks/useCandidates';

import { SignIn } from '@components/SignIn';

type Props = {
  userId: string | null;
  qtdVotes: number;
  candidateId: string;
  alreadyVoted: {
    candidateId: string;
    isVote: boolean;
  };
};

export function CustomButton({ userId, qtdVotes, candidateId, alreadyVoted }: Props) {
  const { isVoting, updatedCandidate } = useCandidates();

  const ButtonComponent = () => {
    return (
      <Button
        size="md"
        bg="green.600"
        isLoading={isVoting}
        isLoadingText="Votando..."
        onPress={() =>
          updatedCandidate({
            voterId: userId,
            candidateId,
            qtdVotes,
          })
        }
        isDisabled={alreadyVoted.isVote}
      >
        {alreadyVoted.isVote ? 'VOTADO' : 'VOTAR'}
      </Button>
    );
  };

  const ButtonToRender = () => {
    if (userId && alreadyVoted.isVote === false) {
      return ButtonComponent();
    } else if (userId && alreadyVoted.isVote === true) {
      if (alreadyVoted.candidateId === candidateId) {
        return ButtonComponent();
      } else {
        return null;
      }
    } else {
      return <SignIn />;
    }
  };

  return ButtonToRender();
}
