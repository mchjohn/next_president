import React, { useState } from 'react';
import { SpeedDial } from '@rneui/themed';

import { useAuth } from '@contexts/AuthContext';
import { useModal } from '@contexts/ModalContext';

export function GlobalButton() {
  const [open, setOpen] = useState(false);

  const { authData, signOut } = useAuth();
  const { openModal, openModalSignUp } = useModal();

  const Dial = (iconName: string, title: string, fn: () => void) => {
    return (
      <SpeedDial.Action icon={{ name: iconName, color: '#FCFCFC' }} title={title} onPress={fn} />
    );
  };

  return (
    <SpeedDial
      isOpen={open}
      color="#4267B2"
      onOpen={() => setOpen(!open)}
      onClose={() => setOpen(!open)}
      icon={{ name: 'settings', color: '#FCFCFC' }}
      openIcon={{ name: 'close', color: '#FCFCFC' }}
    >
      {Dial('add-comment', 'Postar comentário', () => console.log('Add new comment'))}
      {Dial('comment', 'Ver comentários', () => console.log('Navigate to comments view'))}
      {authData?.uid
        ? Dial('logout', 'Fazer logout', signOut)
        : Dial('login', 'Fazer login', openModal)}
      {authData?.uid ? <></> : Dial('person-add', 'Criar conta', openModalSignUp)}
    </SpeedDial>
  );
}
