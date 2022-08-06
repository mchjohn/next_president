import React from 'react';
import { Button } from 'native-base';

import { useUser } from '@contexts/UserContext';
import { useAuth } from '@contexts/AuthContext';

import { useCandidates } from '@hooks/useCandidates';

import { useFirebaseService } from '../../services/firebase/saveUserInFirestore';
import { __voteCandidatePressed } from '../../services/app_center/analytics';

type Props = {
  qtdVotes: number;
  candidateId: string;
  candidateName: string;
};

export function CustomButton({ qtdVotes, candidateId, candidateName }: Props) {
  const { userData } = useUser();
  const { authData } = useAuth();
  const { updatedUser } = useFirebaseService();
  const { isVoting, updatedCandidate } = useCandidates();

  const onVote = () => {
    updatedCandidate({
      candidateId,
      qtdVotes,
    });

    updatedUser(candidateId);

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
        isDisabled={!!userData?.vote || !authData?.uid}
      >
        {userData?.vote ? 'VOTADO' : 'VOTAR'}
      </Button>
    );
  };

  const ButtonToRender = () => {
    if (!!userData?.vote && userData?.vote === candidateId) {
      return ButtonComponent();
    } else if (!!userData?.vote && userData?.vote !== candidateId) {
      return null;
    } else {
      return ButtonComponent();
    }
  };

  return ButtonToRender();
}
