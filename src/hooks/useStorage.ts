import AsyncStorage from '@react-native-async-storage/async-storage';

import { VOTE } from '@constants/store-key';

export function useStorage() {
  const setStoreData = async (value: string) => {
    try {
      await AsyncStorage.setItem(VOTE, value);
    } catch (err) {
      console.log('setStorageData', err);
    }
  };

  const getStoreData = async () => {
    try {
      const data = await AsyncStorage.getItem(VOTE);

      return data;
    } catch (err) {
      console.log('getStoreData', err);
    }
  };

  const deleteStoreData = async () => {
    try {
      await AsyncStorage.removeItem(VOTE);
    } catch (err) {
      console.log('deleteStoreData', err);
    }
  };

  return { setStoreData, getStoreData, deleteStoreData };
}
