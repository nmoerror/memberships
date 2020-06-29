import React from 'react';
import { PickerIOS } from '@react-native-community/picker';

const TypeModal = ({ type, setType }) => (
  <PickerIOS
    selectedValue={type}
    style={{
      height: 230,
      width: '100%',
      backgroundColor: 'white',
      position: 'absolute',
      bottom: 50,
    }}
    onValueChange={(e) => setType(e)}
  >
    <PickerIOS.Item label='Membership' value='Membership' />
    <PickerIOS.Item label='Subscription' value='Subscription' />
    <PickerIOS.Item label='Credit' value='Credit' />
    <PickerIOS.Item label='Bill' value='Bill' />
  </PickerIOS>
);

export default TypeModal;
