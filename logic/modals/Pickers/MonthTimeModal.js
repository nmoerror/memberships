import React from 'react';
import { PickerIOS } from '@react-native-community/picker';
import Colors from '../../constants/Colors';
import i18n from 'i18n-js';

const MonthTimeModal = ({ monthTime, setMonthTime }) => (
  <PickerIOS
    selectedValue={monthTime}
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
    onValueChange={(e) => setMonthTime(e)}
  >
    <PickerIOS.Item
      color={Colors.icons}
      label={i18n.t('15th of every Month')}
      value='15th of every Month'
    />
    <PickerIOS.Item
      color={Colors.icons}
      label={i18n.t('End of every Month')}
      value='End of every Month'
    />
  </PickerIOS>
);

export default MonthTimeModal;
