import React from 'react';
import { Button, Center, Icon, Modal, Text } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import { useAuth } from '@contexts/AuthContext';
import { useModal } from '@contexts/ModalContext';

export function SignIn() {
  const { showModal, closeModal } = useModal();
  const { isLoading, signInWithGoogle, signInWithFacebook } = useAuth();

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

            <Text textAlign="center" color="gray.400" my="2">
              ou
            </Text>

            <Button
              colorScheme="blue"
              bgColor="#1478ef"
              isLoading={isLoading}
              spinnerPlacement="start"
              isLoadingText="Entrando..."
              onPress={signInWithFacebook}
              leftIcon={<Icon as={<MaterialIcons name="facebook" />} size="2xl" color="gray.100" />}
            >
              Entrar com Facebook
            </Button>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
