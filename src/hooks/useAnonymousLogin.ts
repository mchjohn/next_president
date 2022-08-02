import { useCallback } from 'react';
import auth from '@react-native-firebase/auth';

export function useAnonymousLogin() {
  const signInAnonymous = useCallback(async () => {
    try {
      await auth().signInAnonymously();
    } catch (err) {
      console.log('Não foi possível fazer login', err);
    }
  }, []);

  return { signInAnonymous };
}
