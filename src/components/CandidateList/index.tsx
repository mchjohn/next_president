import React, { useMemo } from 'react';
import { Box } from 'native-base';
import { FlashList } from '@shopify/flash-list';

import { ICandidate } from '@src/constants/candidates';
import { ListItem } from './ListItem';

type Props = {
  candidateVoted: string;
  candidates: ICandidate[];
};

export function CandidateList({ candidateVoted, candidates }: Props) {
  const amountVotes = useMemo(() => {
    let amount = 0;
    return candidates.reduce((total, { qtdVotes }) => {
      if (qtdVotes > 0) {
        amount = total + qtdVotes;
      }

      return amount;
    }, 0);
  }, [candidates]);

  return (
    <Box marginY="4" flex={1}>
      <FlashList
        data={candidates}
        estimatedItemSize={109}
        extraData={candidateVoted}
        renderItem={({ item, index }) => (
          <ListItem
            candidate={item}
            amountVotes={amountVotes}
            candidatesPosition={index}
            candidateVoted={candidateVoted}
          />
        )}
      />
    </Box>
  );
}
