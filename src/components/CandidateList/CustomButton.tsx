import React from 'react';
import { Button } from 'native-base';

import { useStorage } from '@hooks/useStorage';
import { useCandidates } from '@hooks/useCandidates';
import { __voteCandidatePressed } from '../../services/app_center/analytics';

type Props = {
  qtdVotes: number;
  candidateId: string;
  candidateName: string;
  candidateVoted: string;
};

export function CustomButton({ qtdVotes, candidateId, candidateName, candidateVoted }: Props) {
  const { setStoreData } = useStorage();
  const { isVoting, updatedCandidate } = useCandidates();

  const onVote = () => {
    updatedCandidate({
      candidateId,
      qtdVotes,
    });

    setStoreData(candidateId);

    const candidate = { id: candidateId, name: candidateName };

    __voteCandidatePressed(candidate, 'CustomButton');
  };

  const ButtonComponent = () => {
    return (
      <Button
        size="md"
        bg="green.600"
        onPress={onVote}
        isLoading={isVoting}
        isLoadingText="Votando..."
        isDisabled={!!candidateVoted}
      >
        {candidateVoted ? 'VOTADO' : 'VOTAR'}
      </Button>
    );
  };

  const ButtonToRender = () => {
    if (!!candidateVoted && candidateVoted === candidateId) {
      return ButtonComponent();
    } else if (!!candidateVoted && candidateVoted !== candidateId) {
      return null;
    } else {
      return ButtonComponent();
    }
  };

  return ButtonToRender();
}
