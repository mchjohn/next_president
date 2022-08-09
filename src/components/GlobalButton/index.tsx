/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-native/no-color-literals */
import React from 'react';
import { Share } from 'react-native';
import { SpeedDial } from '@rneui/themed';
import { useNavigation, useRoute } from '@react-navigation/native';

import { useAuth } from '@contexts/AuthContext';
import { useModal } from '@contexts/ModalContext';

import { PropsStack } from '@src/routes/Models';

export function GlobalButton() {
  const { name } = useRoute();
  const { navigate } = useNavigation<PropsStack>();

  const { authData, signOut } = useAuth();
  const {
    showGlobalButton,
    openModal,
    openModalSignUp,
    openModalComment,
    openGlobalButton,
    closeGlobalButton,
  } = useModal();

  const goToComments = () => {
    closeGlobalButton();
    navigate('Comments');
  };

  const goToHome = () => {
    closeGlobalButton();
    navigate('Home');
  };

  const logOut = () => {
    signOut();
    closeGlobalButton();
  };

  const Dial = (iconName: string, title: string, fn: () => void) => {
    return (
      <SpeedDial.Action
        onPress={fn}
        title={title}
        color="#224dcf"
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
      color="#224dcf"
      isOpen={showGlobalButton}
      onOpen={openGlobalButton}
      onClose={closeGlobalButton}
      icon={{ name: 'settings', color: '#FCFCFC' }}
      openIcon={{ name: 'close', color: '#FCFCFC' }}
    >
      {Dial('share', 'Compartilhar', onShare)}

      {Dial('add-comment', 'Postar comentário', !authData?.uid ? openModal : openModalComment)}

      {name === 'Home'
        ? Dial('comment', 'Ver comentários', goToComments)
        : Dial('people', 'Acompanhar votos', goToHome)}

      {authData?.uid ? Dial('logout', 'Sair', logOut) : Dial('login', 'Entrar', openModal)}

      {authData?.uid ? <></> : Dial('person-add', 'Criar conta', openModalSignUp)}
    </SpeedDial>
  );
}
