import React from 'react';
import { Button, Center, Icon, Modal } from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useAuth } from '@contexts/AuthContext';
import { useModal } from '@contexts/ModalContext';

export function SignIn() {
  const { showModal, closeModal } = useModal();
  const { isLoading, signInWithGoogle } = useAuth();

  return (
    <Center>
      <Modal isOpen={showModal} onClose={closeModal}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton onPress={closeModal} />

          <Modal.Header w="87%">Faça login para votar, comentar e curtir comentários</Modal.Header>
          <Modal.Body>
            <Button
              mt="4"
              colorScheme="blue"
              bgColor="blue.500"
              isLoading={isLoading}
              spinnerPlacement="start"
              isLoadingText="Entrando..."
              onPress={signInWithGoogle}
              leftIcon={<Icon as={<AntDesign name="google" />} size="2xl" color="gray.100" />}
            >
              Entrar com Google
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
