import React from 'react';
import { PickerIOS } from '@react-native-community/picker';

const PaymentInterval = ({ paymentInterval, setPaymentInterval }) => (
  <PickerIOS
    selectedValue={paymentInterval}
    style={{
      height: 230,
      width: '100%',
      backgroundColor: 'white',
      position: 'absolute',
      bottom: 50,
    }}
    onValueChange={(e) => setPaymentInterval(e)}
  >
    <PickerIOS.Item label='Weekly' value='Weekly' />
    <PickerIOS.Item label='Fortnightly' value='Fortnightly' />
    <PickerIOS.Item label='Monthly' value='Monthly' />
    <PickerIOS.Item label='Yearly' value='Yearly' />
  </PickerIOS>
);

export default PaymentInterval;
