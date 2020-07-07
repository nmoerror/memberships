import React from 'react';
import { PickerIOS } from '@react-native-community/picker';
import Colors from '../../constants/Colors';

const TypeModal = ({ type, setType }) => (
  <PickerIOS
    selectedValue={type}
    style={{
      height: 230,
      width: '100%',
      backgroundColor: 'white',
      position: 'absolute',
      bottom: 50,
      borderTopRightRadius: 40,
      borderTopLeftRadius: 40,
    }}
    itemStyle={{
      fontWeight: 'bold',
    }}
    onValueChange={(e) => setType(e)}
  >
    <PickerIOS.Item
      color={Colors.icons}
      label='Membership'
      value='Membership'
    />
    <PickerIOS.Item
      color={Colors.icons}
      label='Subscription'
      value='Subscription'
    />
    <PickerIOS.Item color={Colors.icons} label='Credit' value='Credit' />
    <PickerIOS.Item color={Colors.icons} label='Bill' value='Bill' />
  </PickerIOS>
);

export default TypeModal;
