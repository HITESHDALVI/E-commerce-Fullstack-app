import AsyncStorage from '@react-native-async-storage/async-storage';

const setLocalStorage = async (key: string, value) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (e) {}
};
const getLocalStorage = async (key: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {}
};
const clearLocalStorage = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
    return true;
  } catch (e) {
    return false;
  }
};
const clearAll = async () => {
  try {
    await AsyncStorage.clear();
    return true;
  } catch (e) {
    return false;
  }
};

export {setLocalStorage, getLocalStorage, clearLocalStorage, clearAll};
