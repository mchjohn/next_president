import auth from '@react-native-firebase/auth';
import { useState, useEffect, useCallback } from 'react';

export function useUserAuth() {
  const [user, setUser] = useState<string | null>(null);

  const onAuthStateChanged = useCallback((userData: any) => {
    setUser(userData?.uid);
  }, []);

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, [onAuthStateChanged]);

  return { user, onAuthStateChanged };
}
