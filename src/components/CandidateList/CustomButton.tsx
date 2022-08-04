import React from 'react';
import { Button } from 'native-base';

import { useCandidates } from '@hooks/useCandidates';
import { __voteCandidatePressed } from '../../services/app_center/analytics';

import { SignIn } from '@components/SignIn';

type Props = {
  userId: string | null;
  qtdVotes: number;
  candidateId: string;
  candidateName: string;
  alreadyVoted: {
    candidateId: string;
    isVote: boolean;
  };
};

export function CustomButton({
  userId,
  qtdVotes,
  candidateId,
  candidateName,
  alreadyVoted,
}: Props) {
  const { isVoting, updatedCandidate } = useCandidates();

  const onVote = () => {
    updatedCandidate({
      voterId: userId,
      candidateId,
      qtdVotes,
    });

    const candidate = { id: candidateId, name: candidateName };

    __voteCandidatePressed(userId!, candidate, 'CustomButton');
  };

  const ButtonComponent = () => {
    return (
      <Button
        size="md"
        bg="green.600"
        onPress={onVote}
        isLoading={isVoting}
        isLoadingText="Votando..."
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
