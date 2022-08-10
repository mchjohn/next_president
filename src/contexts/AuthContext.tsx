import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import { CLIENT_ID_PROD, FACEBOOK_APP_ID } from '@env';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Settings, LoginManager, AccessToken } from 'react-native-fbsdk-next';

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

  signOut(): void;
  signInWithGoogle(): Promise<void>;
  signInWithFacebook(): Promise<void>;
};

GoogleSignin.configure({
  webClientId: CLIENT_ID_PROD,
});

Settings.setAppID(FACEBOOK_APP_ID);
Settings.initializeSDK();

const AuthContext = createContext({} as IAuthContextData);

function AuthProvider({ children }: AuthProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [authData, setAuthData] = useState<IUser>({} as IUser);

  const { closeModal } = useModal();
  const { saveUserInFirestore } = useFirebaseService();

  const signInWithFacebook = async () => {
    setIsLoading(true);

    try {
      const { isCancelled, grantedPermissions } = await LoginManager.logInWithPermissions([
        'public_profile',
        'email',
      ]);

      if (isCancelled) {
        console.log('Usuário cancelou o login');
      } else if (grantedPermissions) {
        const accessToken = await AccessToken.getCurrentAccessToken();

        if (!accessToken) {
          console.log('Não foi possível obter o accessToken');
        } else {
          const facebookCredential = auth.FacebookAuthProvider.credential(accessToken.accessToken);

          const { user } = await auth().signInWithCredential(facebookCredential);

          closeModal();

          saveUserInFirestore({
            uid: user?.uid,
            email: user?.email,
            photoURL: user?.photoURL,
            displayName: user?.displayName,
          });

          auth().signInWithCredential(facebookCredential);
        }
      }
    } catch (error) {
      console.log('Erro', error);
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
        signOut,
        signInWithGoogle,
        signInWithFacebook,
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
