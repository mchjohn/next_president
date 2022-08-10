import React from 'react';
import { Text, Icon, Pressable } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

type Props = {
  amount: number;
  isLiked?: boolean;
  isDisabled: boolean;
  color: 'blue.500' | 'gray.500';
  onClick: () => void;
};

export function Likes({ amount, isDisabled, isLiked = false, color, onClick }: Props) {
  return (
    <Pressable
      mt="2"
      mr="3"
      flexDirection="row"
      alignItems="center"
      onPress={onClick}
      disabled={isDisabled}
    >
      <Icon as={<AntDesign name={isLiked ? 'like2' : 'dislike2'} />} color={color} size="4" />
      <Text fontSize="13" color="gray.400" fontWeight="700" ml="1">
        {amount}
      </Text>
    </Pressable>
  );
}
