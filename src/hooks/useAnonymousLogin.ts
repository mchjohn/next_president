import { useCallback, useState } from 'react';
import auth from '@react-native-firebase/auth';

export function useAnonymousLogin() {
  const [isSignIn, setIsSignIn] = useState(false);

  const signInAnonymous = useCallback(async () => {
    setIsSignIn(true);

    try {
      await auth().signInAnonymously();
    } catch (err) {
      console.log('Não foi possível fazer login', err);
    } finally {
      setIsSignIn(false);
    }
  }, []);

  return { isSignIn, signInAnonymous };
}
