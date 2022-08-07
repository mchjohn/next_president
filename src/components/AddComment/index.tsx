import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Box, Button, Center, FormControl, Modal, TextArea, useToast } from 'native-base';

import { useAuth } from '@contexts/AuthContext';
import { useModal } from '@contexts/ModalContext';
import { useComments } from '@hooks/useComments';

import { PropsStack } from '@src/routes/Models';

export function AddComment() {
  const toast = useToast();
  const [comment, setComment] = useState('');
  const { navigate } = useNavigation<PropsStack>();

  const { authData } = useAuth();
  const { isCommenting, addComment } = useComments();
  const { showModalComment, closeModalComment, closeGlobalButton } = useModal();

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
      closeModalComment();
      closeGlobalButton();
      navigate('Comments');
    }
  };

  return (
    <Center>
      <Modal isOpen={showModalComment} onClose={closeModalComment}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton onPress={closeModalComment} />

          <Modal.Header>Adicione um comentário</Modal.Header>
          <Modal.Body>
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
              colorScheme="green"
              onPress={onComment}
              isLoading={isCommenting}
              spinnerPlacement="start"
              isLoadingText="Comentando..."
              isDisabled={isCommenting || !comment}
            >
              Comentar
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
