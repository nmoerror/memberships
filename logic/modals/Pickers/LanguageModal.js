import React from 'react';
import { PickerIOS } from '@react-native-community/picker';
import Colors from '../../constants/Colors';

const LanguageModal = ({ language, setLanguage }) => (
  <PickerIOS
    selectedValue={language}
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
    onValueChange={(e) => setLanguage(e)}
  >
    <PickerIOS.Item color={Colors.icons} label='English' value='English' />
    <PickerIOS.Item color={Colors.icons} label='Japanese' value='Japanese' />
    <PickerIOS.Item color={Colors.icons} label='Spanish' value='Spanish' />
    <PickerIOS.Item color={Colors.icons} label='Korean' value='Korean' />
  </PickerIOS>
);

export default LanguageModal;
