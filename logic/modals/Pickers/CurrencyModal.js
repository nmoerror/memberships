import React from 'react';
import { PickerIOS } from '@react-native-community/picker';
import Colors from '../../constants/Colors';

const CurrencyModal = ({ currency, setCurrency }) => (
  <PickerIOS
    selectedValue={currency}
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
    onValueChange={(e) => setCurrency(e)}
  >
    <PickerIOS.Item color={Colors.icons} label='Dollar  ($)' value='Dollar' />
    <PickerIOS.Item color={Colors.icons} label='Euro  (€)' value='Euro' />
    <PickerIOS.Item color={Colors.icons} label='Pound  (£)' value='Pound' />
    <PickerIOS.Item color={Colors.icons} label='Won  (₩)' value='Won' />
    <PickerIOS.Item color={Colors.icons} label='Yen  (¥)' value='Yen' />
  </PickerIOS>
);

export default CurrencyModal;
