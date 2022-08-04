import React, { useMemo } from 'react';
import { Box } from 'native-base';
import { FlashList } from '@shopify/flash-list';

import { ICandidate } from '@src/constants/candidates';
import { ListItem } from './ListItem';

type Props = {
  user: string | null;
  candidates: ICandidate[];
};

export function CandidateList({ user, candidates }: Props) {
  const amountVotes = useMemo(() => {
    let amount = 0;
    return candidates.reduce((total, { qtdVotes }) => {
      if (qtdVotes > 0) {
        amount = total + qtdVotes;
      }

      return amount;
    }, 0);
  }, [candidates]);

  const alreadyVoted = useMemo(() => {
    let voter = {
      candidateId: '',
      isVote: false,
    };

    candidates.map(({ voters }) => {
      voters?.map(({ voterId, candidateId }) => {
        if (voterId === user && candidateId) {
          voter = {
            candidateId,
            isVote: true,
          };
        }
      });
    });

    return voter;
  }, [candidates, user]);

  return (
    <Box marginY="4" flex={1}>
      <FlashList
        data={candidates}
        extraData={user}
        estimatedItemSize={109}
        renderItem={({ item, index }) => (
          <ListItem
            userId={user}
            candidate={item}
            amountVotes={amountVotes}
            alreadyVoted={alreadyVoted}
            candidatesPosition={index}
          />
        )}
      />
    </Box>
  );
}
