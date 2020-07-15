import React from 'react';
import { PickerIOS } from '@react-native-community/picker';
import Colors from '../../constants/Colors';
import i18n from 'i18n-js';

const WeekDaysModal = ({ weekday, setWeekDay }) => (
  <PickerIOS
    selectedValue={weekday}
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
    onValueChange={(e) => setWeekDay(e)}
  >
    <PickerIOS.Item
      color={Colors.icons}
      label={i18n.t('Mondays')}
      value='Monday'
    />
    <PickerIOS.Item
      color={Colors.icons}
      label={i18n.t('Tuesdays')}
      value='Tuesday'
    />
    <PickerIOS.Item
      color={Colors.icons}
      label={i18n.t('Wednesdays')}
      value='Wednesday'
    />
    <PickerIOS.Item
      color={Colors.icons}
      label={i18n.t('Thursdays')}
      value='Thursday'
    />
    <PickerIOS.Item
      color={Colors.icons}
      label={i18n.t('Fridays')}
      value='Friday'
    />
    <PickerIOS.Item
      color={Colors.icons}
      label={i18n.t('Saturdays')}
      value='Saturday'
    />
    <PickerIOS.Item
      color={Colors.icons}
      label={i18n.t('Sundays')}
      value='Sunday'
    />
  </PickerIOS>
);

export default WeekDaysModal;
