import React, { useMemo } from 'react';
import { Box, HStack, VStack, Text, Spacer, Avatar } from 'native-base';

import { useAuth } from '@contexts/AuthContext';
import { useModal } from '@contexts/ModalContext';
import { useComments } from '@hooks/useComments';

import { Likes } from '@components/Likes';
import { IComment } from '@constants/comment';

type Props = {
  comment: IComment;
};

export function ListItem({ comment }: Props) {
  const { authData } = useAuth();
  const { openModal } = useModal();
  const { isLiking, toggleLikeComment } = useComments();

  const onLike = async (type: 'like' | 'dislike') => {
    if (!authData.uid) {
      return openModal();
    }

    toggleLikeComment(
      authData?.uid,
      comment?.id,
      comment?.amountLike,
      comment?.amountDislike,
      type,
    );
  };

  const likes = useMemo(() => {
    let id = '';
    let option = '';

    comment?.likes?.map(({ type, userId }) => {
      if (authData?.uid === userId) {
        id = userId;
        option = type;
      }
    });

    if (id && option) {
      return option;
    }
  }, [authData?.uid, comment?.likes]);

  return (
    <Box borderBottomWidth="1" borderColor="gray.300" py="4" marginX="2" w={'100%'}>
      <HStack space={4} justifyContent="space-between" alignItems="center" w={'100%'}>
        <Avatar
          size="sm"
          rounded="8"
          _image={{ borderRadius: 8 }}
          source={{
            uri: `https://avatars.dicebear.com/api/adventurer-neutral/${comment?.owner}.png`,
          }}
        >
          {`${comment?.owner[0]}${comment?.owner[1]}`}
        </Avatar>

        <VStack bg="gray.100" p="2" borderRadius="8" w={'80%'} shadow={3}>
          <Text color="gray.900" fontWeight="600" fontSize="md">
            {comment?.owner}
          </Text>
          <Text color="gray.600" fontWeight="600" fontSize="md">
            {comment?.content}
          </Text>

          <HStack alignItems="center">
            <Likes
              isLiked
              amount={comment?.amountLike}
              onClick={() => onLike('like')}
              isDisabled={isLiking || likes === 'like'}
              color={likes === 'like' ? 'blue.500' : 'gray.500'}
            />
            <Likes
              amount={comment?.amountDislike}
              onClick={() => onLike('dislike')}
              isDisabled={isLiking || likes === 'dislike'}
              color={likes === 'dislike' ? 'blue.500' : 'gray.500'}
            />
          </HStack>
        </VStack>
        <Spacer />
      </HStack>
    </Box>
  );
}
