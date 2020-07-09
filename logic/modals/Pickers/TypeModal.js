import React from 'react';
import { PickerIOS } from '@react-native-community/picker';
import Colors from '../../constants/Colors';
import i18n from 'i18n-js';

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
      label={i18n.t('Membership')}
      value='Membership'
    />
    <PickerIOS.Item
      color={Colors.icons}
      label={i18n.t('Subscription')}
      value='Subscription'
    />
    <PickerIOS.Item
      color={Colors.icons}
      label={i18n.t('Credit')}
      value='Credit'
    />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('Bill')} value='Bill' />
  </PickerIOS>
);

export default TypeModal;
