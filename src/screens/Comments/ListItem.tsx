import React from 'react';
import { Box, HStack, VStack, Text, Spacer, Avatar } from 'native-base';

import { IComment } from '@constants/comment';

type Props = {
  comment: IComment;
};

export function ListItem({ comment }: Props) {
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
        </VStack>
        <Spacer />
      </HStack>
    </Box>
  );
}
