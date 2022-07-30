import React, { useMemo } from 'react';
import { Box, FlatList } from 'native-base';

import { ICandidate } from '@src/constants/candidates';
import { ListItem } from './ListItem';

type Props = {
  candidates: ICandidate[];
};

export function CandidateList({ candidates }: Props) {
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
      <FlatList
        data={candidates}
        renderItem={({ item, index }) => (
          <ListItem candidate={item} amountVotes={amountVotes} isFirstCandidate={index} />
        )}
        keyExtractor={item => item.name}
      />
    </Box>
  );
}
