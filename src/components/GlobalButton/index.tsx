/* eslint-disable react-native/no-color-literals */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { Share } from 'react-native';
import { SpeedDial } from '@rneui/themed';

import { useAuth } from '@contexts/AuthContext';
import { useModal } from '@contexts/ModalContext';

export function GlobalButton() {
  const { authData, signOut } = useAuth();
  const { showGlobalButton, openModal, openGlobalButton, closeGlobalButton } = useModal();

  const logOut = () => {
    signOut();
    closeGlobalButton();
  };

  const Dial = (iconName: string, title: string, fn: () => void) => {
    return (
      <SpeedDial.Action
        onPress={fn}
        title={title}
        color="#007BFF"
        titleStyle={{ color: '#041B10' }}
        icon={{ name: iconName, color: '#FCFCFC' }}
      />
    );
  };

  const onShare = async () => {
    try {
      await Share.share({
        message:
          'Baixe o app *Próximo Presidente* e me ajude a escolher o próximo presidente do Brasil. Baixe na *PlayStore* 👉 https://play.google.com/store/apps/details?id=com.next_president',
      });
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <SpeedDial
      color="#007BFF"
      isOpen={showGlobalButton}
      onOpen={openGlobalButton}
      buttonStyle={{ borderWidth: 2, borderColor: '#FCFCFC', borderRadius: 100 }}
      onClose={closeGlobalButton}
      icon={{ name: 'settings', color: '#FCFCFC' }}
      openIcon={{ name: 'close', color: '#FCFCFC' }}
    >
      {Dial('share', 'Compartilhar', onShare)}

      {authData?.uid ? Dial('logout', 'Sair', logOut) : Dial('login', 'Entrar', openModal)}
    </SpeedDial>
  );
}
