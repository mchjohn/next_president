import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  Button,
  Center,
  FormControl,
  Icon,
  Input,
  Modal,
  Text,
  Pressable,
  WarningOutlineIcon,
} from 'native-base';

import { useModal } from '@contexts/ModalContext';
import { useAuth } from '@contexts/AuthContext';

export function SignIn() {
  const { showModal, closeModal, openModalSignUp } = useModal();
  const { isLoading, errorMessage, resetErrorMessage, signInWithGoogle, signInWithEmail } =
    useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = React.useState(false);

  const login = async (provider: 'google' | 'email') => {
    provider === 'google' ? await signInWithGoogle() : await signInWithEmail(email, password);
  };

  const resetModal = () => {
    setPassword('');
    closeModal();
    resetErrorMessage();
  };

  return (
    <Center>
      <Modal isOpen={showModal} onClose={resetModal}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton onPress={resetModal} />

          <Modal.Header>Entre para votar e comentar</Modal.Header>
          <Modal.Body>
            <FormControl isInvalid={!!errorMessage}>
              <FormControl.Label>Email *</FormControl.Label>
              <Input
                value={email}
                autoCapitalize="none"
                keyboardType="email-address"
                onChangeText={setEmail}
                placeholder="exemplo@exemplo.com"
                InputLeftElement={
                  <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="gray.400" />
                }
              />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                {errorMessage}
              </FormControl.ErrorMessage>
            </FormControl>

            <FormControl mt="3" isInvalid={!!errorMessage}>
              <FormControl.Label>Senha *</FormControl.Label>
              <Input
                value={password}
                autoComplete="off"
                autoCorrect={false}
                onChangeText={setPassword}
                placeholder="Mínimo 6 caracteres"
                type={show ? 'text' : 'password'}
                InputRightElement={
                  <Icon
                    mr="2"
                    size={5}
                    color="gray.400"
                    onPress={() => setShow(!show)}
                    as={<MaterialIcons name={show ? 'visibility' : 'visibility-off'} />}
                  />
                }
              />
              <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
                {errorMessage}
              </FormControl.ErrorMessage>
            </FormControl>

            <Button
              mt="4"
              colorScheme="green"
              isLoading={isLoading}
              spinnerPlacement="start"
              isLoadingText="Entrando..."
              onPress={() => login('email')}
              isDisabled={isLoading || !email || password.length < 6}
            >
              Entrar
            </Button>

            <Text textAlign="center" color="gray.600" my="2">
              ou
            </Text>

            <Button
              colorScheme="blue"
              bgColor="blue.500"
              isLoading={isLoading}
              spinnerPlacement="start"
              isLoadingText="Entrando..."
              onPress={() => login('google')}
            >
              Entrar com Google
            </Button>

            <Pressable
              onPress={() => {
                closeModal();
                openModalSignUp();
              }}
            >
              <Text textAlign="center" color="gray.600" mt="4" mb="1">
                Não tem uma conta?{' '}
                <Text fontWeight="bold" p="2">
                  Crie uma agora
                </Text>
              </Text>
            </Pressable>
          </Modal.Body>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
