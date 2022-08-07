import React, {
  createContext,
  ReactNode,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import firestore from '@react-native-firebase/firestore';

import { IUser } from '@constants/user';

import { useAuth } from '@contexts/AuthContext';

import { __getError } from '../services/app_center/analytics';

type UserProviderProps = {
  children: ReactNode;
};

type IUserContextData = {
  userData: IUser;
  isLoading: boolean;

  getUser(id: string): void;
};

const UserContext = createContext({} as IUserContextData);

function UserProvider({ children }: UserProviderProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<IUser>({} as IUser);

  const { authData } = useAuth();

  // Busca o usuário no firestore
  const getUser = useCallback(async () => {
    setIsLoading(true);

    try {
      firestore()
        .collection('Users')
        .doc(authData?.uid)
        .onSnapshot(docSnapshot => {
          const docUser = docSnapshot.data() as IUser;

          setUserData(docUser);
        });
    } catch (error) {
      __getError(error, 'useUser - getUser');
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }, [authData?.uid]);

  useEffect(() => {
    if (authData.uid) {
      getUser();
    }
  }, [authData, getUser]);

  return (
    <UserContext.Provider
      value={{
        userData,
        isLoading,
        getUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

function useUser() {
  const context = useContext(UserContext);

  return context;
}

export { UserProvider, useUser };
