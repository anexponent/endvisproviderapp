import AsyncStorage from '@react-native-async-storage/async-storage';

export const getValue = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key)
      if(value !== null) {
        // value previously stored
        return value;
      }
    } catch(e) {
      // error reading value
    }
}

export const removeItemValue = async (key)=> {
    try {
        await AsyncStorage.removeItem(key);
        return true;
    }
    catch(exception) {
        return false;
    }
}
