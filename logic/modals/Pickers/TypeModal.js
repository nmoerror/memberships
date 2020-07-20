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
    <PickerIOS.Item color={Colors.icons} label='Company' value='Company' />
    <PickerIOS.Item color={Colors.icons} label='Debt' value='Debt' />
    <PickerIOS.Item color={Colors.icons} label='Family' value='Family' />
    <PickerIOS.Item color={Colors.icons} label='Home' value='Home' />
    <PickerIOS.Item
      color={Colors.icons}
      label='Investments'
      value='Investments'
    />
    <PickerIOS.Item color={Colors.icons} label='Leisure' value='Leisure' />
    <PickerIOS.Item
      color={Colors.icons}
      label='Memberships'
      value='Memberships'
    />
    <PickerIOS.Item color={Colors.icons} label='Education' value='Education' />
    <PickerIOS.Item color={Colors.icons} label='Services' value='Services' />
    <PickerIOS.Item
      color={Colors.icons}
      label='Subscriptions'
      value='Subscriptions'
    />
    <PickerIOS.Item color={Colors.icons} label='Work' value='Work' />
  </PickerIOS>
);

export default TypeModal;
