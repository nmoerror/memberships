import React from 'react';
import { PickerIOS } from '@react-native-community/picker';
import Colors from '../../constants/Colors';
import i18n from 'i18n-js';

const MonthDaysModal = ({ monthday, setMonthDay }) => (
  <PickerIOS
    selectedValue={monthday}
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
    onValueChange={(e) => setMonthDay(e)}
  >
    <PickerIOS.Item color={Colors.icons} label={i18n.t('1st')} value='1' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('2nd')} value='2' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('3rd')} value='3' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('4th')} value='4' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('5th')} value='5' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('6th')} value='6' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('7th')} value='7' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('8th')} value='8' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('9th')} value='9' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('10th')} value='10' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('11th')} value='11' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('12th')} value='12' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('13th')} value='13' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('14th')} value='14' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('15th')} value='15' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('16th')} value='16' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('17th')} value='17' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('18th')} value='18' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('19th')} value='19' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('20th')} value='20' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('21st')} value='21' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('22nd')} value='22' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('23rd')} value='23' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('24th')} value='24' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('25th')} value='25' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('26th')} value='26' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('27th')} value='27' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('28th')} value='28' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('29th')} value='29' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('30th')} value='30' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('31st')} value='31' />
    <PickerIOS.Item color={Colors.icons} label={i18n.t('32nd')} value='32' />
  </PickerIOS>
);

export default MonthDaysModal;
