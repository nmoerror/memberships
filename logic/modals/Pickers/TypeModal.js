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
      label={i18n.t('Company')}
      value='Company'
    />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('Debt')} value='Debt' />
    <PickerIOS.Item
      color={Colors.icons}
      label={i18n.t('Family')}
      value='Family'
    />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('Home')} value='Home' />
    <PickerIOS.Item
      color={Colors.icons}
      label={i18n.t('Investments')}
      value='Investments'
    />
    <PickerIOS.Item
      color={Colors.icons}
      label={i18n.t('Leisure')}
      value='Leisure'
    />
    <PickerIOS.Item
      color={Colors.icons}
      label={i18n.t('Memberships')}
      value='Memberships'
    />
    <PickerIOS.Item
      color={Colors.icons}
      label={i18n.t('Services')}
      value='Services'
    />
    <PickerIOS.Item
      color={Colors.icons}
      label={i18n.t('Subscriptions')}
      value='Subscriptions'
    />
  </PickerIOS>
);

export default TypeModal;
