import firestore from '@react-native-firebase/firestore';

import { IUser } from '@constants/user';
import { useAuth } from '@contexts/AuthContext';

import { __getError } from '../app_center/analytics';

export function useFirebaseService() {
  const { authData } = useAuth();

  // Salva o usuário no firestore
  const saveUserInFirestore = async (user: IUser) => {
    try {
      // Verifica se o usuário já está salvo no firestore
      const { exists } = await firestore().collection('Users').doc(user.uid).get();

      if (exists) {
        return;
      }

      await firestore().collection('Users').doc(user.uid).set(
        {
          email: user.email,
          photoURL: user.photoURL,
          displayName: user.displayName,
          createdAt: firestore.FieldValue.serverTimestamp(),
        },
        { merge: true },
      );
    } catch (err) {
      console.log(err);
    }
  };

  // Atualiza o usuário com o voto
  const updatedUser = async (vote: string) => {
    try {
      await firestore().doc(`Users/${authData?.uid}`).update({
        vote: vote,
      });
    } catch (error) {
      __getError(error, 'useUser - updatedUser');
      console.log(error);
    }
  };

  return { saveUserInFirestore, updatedUser };
}
