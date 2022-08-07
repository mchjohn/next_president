import React, { useState } from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Button, Center, FormControl, Icon, Input, Modal, Pressable, Text } from 'native-base';

import { useAuth } from '@contexts/AuthContext';
import { useModal } from '@contexts/ModalContext';

export function SignUp() {
  const { isLoading, signUpWithEmail } = useAuth();
  const { showModalSignUp, openModal, closeModalSignUp } = useModal();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = React.useState(false);

  const signUp = async () => {
    await signUpWithEmail(email, password);

    closeModalSignUp();
  };

  return (
    <Center>
      <Modal isOpen={showModalSignUp} onClose={closeModalSignUp}>
        <Modal.Content maxWidth="400px">
          <Modal.CloseButton />
          <Modal.Header>Crie uma conta para votar</Modal.Header>
          <Modal.Body>
            <FormControl>
              <FormControl.Label>Email *</FormControl.Label>
              <Input
                value={email}
                autoCapitalize="none"
                onChangeText={setEmail}
                keyboardType="email-address"
                placeholder="exemplo@exemplo.com"
                InputLeftElement={
                  <Icon as={<MaterialIcons name="person" />} size={5} ml="2" color="gray.400" />
                }
              />
            </FormControl>
            <FormControl mt="3">
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
            </FormControl>

            <Button
              mt="4"
              onPress={signUp}
              colorScheme="green"
              isLoading={isLoading}
              spinnerPlacement="start"
              isLoadingText="Entrando..."
              isDisabled={isLoading || !email || password.length < 6}
            >
              Cadastrar
            </Button>
          </Modal.Body>

          <Pressable
            onPress={() => {
              closeModalSignUp();
              openModal();
            }}
          >
            <Text textAlign="center" color="gray.600" mt="1" mb="4">
              Já tem uma conta?{' '}
              <Text fontWeight="bold" p="2">
                Faça login agora
              </Text>
            </Text>
          </Pressable>
        </Modal.Content>
      </Modal>
    </Center>
  );
}
