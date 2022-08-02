import { useState, useCallback } from 'react';
import firestore from '@react-native-firebase/firestore';

import { ICandidate } from '@constants/candidates';

export type UpdatedCandidateProps = {
  voterId: string;
  qtdVotes: number;
  candidateId: string;
};

/** Hook utilizado para buscar os candidatos no firestore. */
export function useCandidates() {
  const [isVoting, setIsVoting] = useState(false);
  const [candidates, setCandidates] = useState<ICandidate[]>([]);

  // Busca todos os candidatos
  const getCandidates = useCallback(async () => {
    try {
      firestore()
        .collection('Candidates')
        .orderBy('qtdVotes', 'desc')
        .onSnapshot(documentSnapshot => {
          const allCandidates = documentSnapshot.docs.map(doc => {
            const data = doc.data() as ICandidate;

            const candidateWithId = {
              ...data,
              id: doc.id,
            };

            return candidateWithId;
          }) as ICandidate[];

          setCandidates(allCandidates);
        });
    } catch (error) {
      console.log(error);
    }
  }, []);

  // Efetua a votação
  const updatedCandidate = async (data: UpdatedCandidateProps) => {
    setIsVoting(true);
    let updatedData = {};

    updatedData = {
      qtdVotes: data.qtdVotes + 1,
    };

    try {
      await firestore()
        .doc(`Candidates/${data.candidateId}`)
        .update({
          ...updatedData,
          voters: firestore.FieldValue.arrayUnion({
            voterId: data.voterId,
            candidateId: data.candidateId,
          }),
        });
    } catch (err) {
      console.log(err);
    } finally {
      setIsVoting(false);
    }
  };

  return { candidates, isVoting, getCandidates, updatedCandidate };
}
