/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { Box } from 'native-base';
import { FlashList } from '@shopify/flash-list';

import { FilterCommentsProps, useComments } from '@hooks/useComments';

import { GlobalButton } from '@components/GlobalButton';
import { SkeletonList } from '@components/SkeletonList';
import { FilterPopover } from '@components/FilterPopover';
import { HeaderComments } from '@components/HeaderComments';

import { ListItem } from './ListItem';

export function Comments() {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [filter, setFilter] = useState<FilterCommentsProps>('createdAt');

  const { comments, getComments } = useComments();

  const onFilter = useCallback((type: FilterCommentsProps) => {
    if (type === 'amountLike') {
      setFilter('amountLike');
    } else if (type === 'amountDislike') {
      setFilter('amountDislike');
    } else {
      setFilter('createdAt');
    }

    setPopoverOpen(false);
  }, []);

  useEffect(() => {
    getComments(filter);
  }, [filter, getComments]);

  return (
    <Box flex={1}>
      <HeaderComments />

      <FilterPopover
        onFilter={onFilter}
        popoverOpen={popoverOpen}
        setPopoverOpen={setPopoverOpen}
      />

      {!comments.length ? (
        <SkeletonList />
      ) : (
        <FlashList
          data={comments}
          estimatedItemSize={326}
          contentContainerStyle={{ paddingBottom: 38 }}
          renderItem={({ item }) => <ListItem comment={item} />}
        />
      )}

      <GlobalButton />
    </Box>
  );
}
