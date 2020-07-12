import AsyncStorage from '@react-native-community/async-storage';

export function getItemAsync(item) {
  try {
    return AsyncStorage.getItem(item).then((response) => {
      return response;
    });
  } catch (err) {
    alert(`Err: ${err}`);
  }

  return data;
}

export function setItemAsync(item, value) {
  try {
    AsyncStorage.setItem(item, value)
      .then((response) => {
        return true;
      })
      .done();
  } catch (err) {
    alert(`Err: ${err}`);
  }
  return;
}

export function deleteItemAsync(item) {
  try {
    AsyncStorage.deleteItem(item).then((response) => {
      return true;
    });
  } catch (err) {
    alert(`Err: ${err}`);
  }
  return;
}
