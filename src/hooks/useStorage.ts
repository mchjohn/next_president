import AsyncStorage from '@react-native-async-storage/async-storage';

import { VOTE } from '@constants/store-key';
import { __getError } from '../services/app_center/analytics';

export function useStorage() {
  const setStoreData = async (value: string) => {
    try {
      await AsyncStorage.setItem(VOTE, value);
    } catch (error) {
      __getError(error, 'useStorage - setStoreData');
      console.log('setStorageData', error);
    }
  };

  const getStoreData = async () => {
    try {
      const data = await AsyncStorage.getItem(VOTE);

      return data;
    } catch (error) {
      __getError(error, 'useStorage - getStoreData');
      console.log('getStoreData', error);
    }
  };

  const deleteStoreData = async () => {
    try {
      await AsyncStorage.removeItem(VOTE);
    } catch (error) {
      __getError(error, 'useStorage - deleteStoreData');
      console.log('deleteStoreData', error);
    }
  };

  return { setStoreData, getStoreData, deleteStoreData };
}
