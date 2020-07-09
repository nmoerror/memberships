import React from 'react';
import { PickerIOS } from '@react-native-community/picker';
import Colors from '../../constants/Colors';
import i18n from 'i18n-js';

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
    <PickerIOS.Item
      color={Colors.icons}
      label={i18n.t('Dollar')}
      value='Dollar'
    />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('Euro')} value='Euro' />
    <PickerIOS.Item
      color={Colors.icons}
      label={i18n.t('Pound')}
      value='Pound'
    />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('Won')} value='Won' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('Yen')} value='Yen' />
  </PickerIOS>
);

export default CurrencyModal;
