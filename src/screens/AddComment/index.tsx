import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, FormControl, TextArea, useToast, Text, ScrollView } from 'native-base';

import { useAuth } from '@contexts/AuthContext';
import { useComments } from '@hooks/useComments';
import { useModal } from '@contexts/ModalContext';

import { PropsStack } from '@src/routes/Models';

export function AddComment() {
  const toast = useToast();
  const [comment, setComment] = useState('');
  const { navigate } = useNavigation<PropsStack>();

  const { authData } = useAuth();
  const { openModal } = useModal();
  const { isCommenting, addComment } = useComments();

  let minCharacters = 0;
  let maxCharacters = 500;

  const onComment = () => {
    if (authData?.uid && authData?.email) {
      const owner = authData?.displayName
        ? authData?.displayName
        : authData?.email?.slice(0, authData?.email?.indexOf('@'));
      addComment(authData?.uid, owner, comment);

      toast.show({
        render: () => {
          return (
            <Box bg="green.300" p="4" rounded="sm" mb={5}>
              Parabéns! Comentário adicionado com sucesso 🙏
            </Box>
          );
        },
      });

      setComment('');
      navigate('Comments');
    } else {
      openModal();
    }
  };

  return (
    <ScrollView p={8} keyboardShouldPersistTaps="handled">
      <Text fontSize="xl" mb="16">
        Deixe seu comentário aqui
      </Text>

      <FormControl>
        <FormControl.Label>Comentário *</FormControl.Label>
        <TextArea
          h="40"
          value={comment}
          maxLength={500}
          onChangeText={setComment}
          autoCompleteType={undefined}
          placeholder="Digite seu comentário"
        />
        <FormControl.HelperText>
          {`${(minCharacters += comment.length)}/${(maxCharacters -= comment.length)}`}
        </FormControl.HelperText>
      </FormControl>

      <Button
        mt="4"
        w="100%"
        colorScheme="green"
        onPress={onComment}
        isLoading={isCommenting}
        spinnerPlacement="start"
        isLoadingText="Comentando..."
        isDisabled={isCommenting || !comment}
      >
        Comentar
      </Button>

      <Text w="100%" fontSize="2xs" textAlign="center" mt="4" color="gray.500">
        Não serão tolerados qualquer tipo de comentário homofóbico, racistas e preconceituosos,
        podendo ser deletado sem aviso prévio.
      </Text>
    </ScrollView>
  );
}
