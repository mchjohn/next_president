import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

import { IUser } from '@constants/user';

import { useModal } from '@contexts/ModalContext';

import { __getError } from '../services/app_center/analytics';
import { useFirebaseService } from '../services/firebase/saveUserInFirestore';

type AuthProviderProps = {
  children: ReactNode;
};

type IAuthContextData = {
  authData: IUser;
  isLoading: boolean;
  errorMessage: string;

  signOut(): void;
  resetErrorMessage(): void;
  signInWithGoogle(): Promise<void>;
  signUpWithEmail(email: string, password: string): Promise<void>;
  signInWithEmail(email: string, password: string): Promise<void>;
};

const { CLIENT_ID } = process.env;

GoogleSignin.configure({
  webClientId: CLIENT_ID,
});

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [authData, setAuthData] = useState<IUser>({} as IUser);

  const { closeModal, closeModalSignUp } = useModal();
  const { saveUserInFirestore } = useFirebaseService();

  const signUpWithEmail = async (email: string, password: string) => {
    try {
      const { user } = await auth().createUserWithEmailAndPassword(email, password);

      saveUserInFirestore({
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
        displayName: user.displayName,
      });

      closeModalSignUp();
      setErrorMessage('');
    } catch (err: any) {
      if (err.code === 'auth/email-already-in-use') {
        setErrorMessage('Esse e-mail já está em uso');
      } else if (err.code === 'auth/weak-password') {
        setErrorMessage('A senha deve ter no mínimo 6 caracteres');
      } else if (err.code === 'auth/invalid-email') {
        setErrorMessage('Digite um e-mail válido');
      } else if (err.code === 'auth/too-many-requests') {
        setErrorMessage(
          'Muitas tentativas com erro, recupere sua senha ou tente novamente em instantes',
        );
      }
    }
  };

  const signInWithEmail = async (email: string, password: string) => {
    setIsLoading(true);

    try {
      await auth().signInWithEmailAndPassword(email, password);

      closeModal();
      setErrorMessage('');
      __getError(email, 'AuthProvider - signInWithEmail');
    } catch (err: any) {
      console.log('Err signInWithEmail', err);

      if (err.code === 'auth/wrong-password') {
        setErrorMessage('Verifique sua senha e tente novamente');
      } else if (err.code === 'auth/user-not-found') {
        setErrorMessage('Usuário não encontrado. Verifique seu e-mail');
      } else if (err.code === 'auth/invalid-email') {
        setErrorMessage('Digite um e-mail válido');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const signInWithGoogle = async () => {
    setIsLoading(true);

    try {
      // Get the users ID token
      const { idToken } = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      const { user } = await auth().signInWithCredential(googleCredential);

      saveUserInFirestore({
        uid: user.uid,
        email: user.email,
        photoURL: user.photoURL,
        displayName: user.displayName,
      });

      closeModal();
      __getError(user.uid, 'AuthProvider - signInWithGoogle');
    } catch (error) {
      console.log('Error', error);
      __getError(error, 'AuthProvider - signInWithGoogle - Error');
    } finally {
      setIsLoading(false);
    }
  };

  const signOut = async () => {
    setIsLoading(true);

    try {
      await auth().signOut();
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const resetErrorMessage = () => {
    setErrorMessage('');
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(user => {
      if (user) {
        const userInfo = {
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          displayName: user.displayName,
        };

        setAuthData(userInfo);
      } else {
        setAuthData({} as IUser);
      }
    });

    return subscriber;
  }, []);

  return (
    <AuthContext.Provider
      value={{
        authData,
        isLoading,
        errorMessage,
        signOut,
        signUpWithEmail,
        signInWithEmail,
        signInWithGoogle,
        resetErrorMessage,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  return context;
}

export { AuthProvider, useAuth };
