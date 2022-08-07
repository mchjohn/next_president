import React, { useMemo } from 'react';
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

  const vote = useMemo(() => {
    if (authData?.uid) {
      return userData?.vote;
    } else {
      return '';
    }
  }, [authData?.uid, userData?.vote]);

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
        isDisabled={!!vote || !authData?.uid}
      >
        {vote ? 'VOTADO' : 'VOTAR'}
      </Button>
    );
  };

  const ButtonToRender = () => {
    if (!!vote && vote === candidateId) {
      return ButtonComponent();
    } else if (!!vote && vote !== candidateId) {
      return null;
    } else {
      return ButtonComponent();
    }
  };

  return ButtonToRender();
}
