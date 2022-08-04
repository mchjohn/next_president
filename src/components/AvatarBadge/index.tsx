import React from 'react';
import { Avatar, Text } from 'native-base';

type Props = {
  uri: string;
  candidatesPosition: number;
};

export function AvatarBadge({ uri, candidatesPosition }: Props) {
  return (
    <Avatar
      size="lg"
      source={{
        uri: uri,
      }}
    >
      {candidatesPosition <= 1 ? (
        <Avatar.Badge
          bg={candidatesPosition === 0 ? 'green.600' : 'yellow.300'}
          alignItems="center"
          justifyContent="center"
        >
          <Text fontSize="2xs" fontWeight="bold" color="white">
            {candidatesPosition === 0 ? '1' : '2'}
          </Text>
        </Avatar.Badge>
      ) : null}
    </Avatar>
  );
}
