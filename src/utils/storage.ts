import 'react-native-get-random-values';
import {v4} from 'uuid';
import AsyncStorgae from '@react-native-async-storage/async-storage';
export const genId = () => {
  return v4();
};
export const save = async (key: string, value: string) => {
  try {
    return await AsyncStorgae.setItem(key, value);
  } catch (e) {}
};
export const load = async (key: string) => {
  try {
    return await AsyncStorgae.getItem(key);
  } catch (e) {}
};
export const remove = async (key: string) => {
  try {
    return await AsyncStorgae.removeItem(key);
  } catch (e) {}
};
export const clear = async () => {
  AsyncStorgae.clear();
};
