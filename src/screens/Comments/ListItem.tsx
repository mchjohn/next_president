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
  const { isLiking, likeComment, dislikeComment } = useComments();

  const onLikeDislike = async (type: 'like' | 'dislike') => {
    if (!authData.uid) {
      return openModal();
    }

    if (type === 'like') {
      likeComment(authData?.uid, comment?.id);
    } else {
      dislikeComment(authData?.uid, comment?.id);
    }
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
              amount={comment?.amountLike}
              isDisabled={isLiking || !!likes}
              onClick={() => onLikeDislike('like')}
              icon={likes === 'like' ? 'like1' : 'like2'}
              color={likes === 'like' ? 'blue.500' : 'gray.500'}
            />
            <Likes
              amount={comment?.amountDislike}
              isDisabled={isLiking || !!likes}
              onClick={() => onLikeDislike('dislike')}
              icon={likes === 'dislike' ? 'dislike1' : 'dislike2'}
              color={likes === 'dislike' ? 'blue.500' : 'gray.500'}
            />
          </HStack>
        </VStack>
        <Spacer />
      </HStack>
    </Box>
  );
}
