import * as SecureStore from 'expo-secure-store';

export function getItemAsync(item) {
  try {
    return SecureStore.getItemAsync(item).then((response) => {
      return response;
    });
  } catch (err) {
    alert(`Err: ${err}`);
  }

  return data;
}

export function setItemAsync(item, value) {
  try {
    SecureStore.setItemAsync(item, value)
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
    SecureStore.deleteItemAsync(item).then((response) => {
      return true;
    });
  } catch (err) {
    alert(`Err: ${err}`);
  }
  return;
}
