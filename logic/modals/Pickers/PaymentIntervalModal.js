import React, { useRef, useEffect, useState } from 'react';
import { PickerIOS } from '@react-native-community/picker';
import Colors from '../../constants/Colors';
import { Animated } from 'react-native';
import styled from 'styled-components';
import i18n from 'i18n-js';

const PaymentInterval = ({ route, paymentInterval, setPaymentInterval }) => {
  return (
    <A
      selectedValue={paymentInterval}
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
      onValueChange={(e) => setPaymentInterval(e)}
    >
      <PickerIOS.Item
        color={Colors.icons}
        label={i18n.t('Weekly')}
        value='Weekly'
      />
      <PickerIOS.Item
        color={Colors.icons}
        label={i18n.t('Fortnightly')}
        value='Fortnightly'
      />
      <PickerIOS.Item
        color={Colors.icons}
        label={i18n.t('Monthly')}
        value='Monthly'
      />
      <PickerIOS.Item
        color={Colors.icons}
        label={i18n.t('Quarterly')}
        value='Quarterly'
      />
      <PickerIOS.Item
        color={Colors.icons}
        label={i18n.t('Yearly')}
        value='Yearly'
      />
    </A>
  );
};

const An = styled.PickerIOS``;

const A = Animated.createAnimatedComponent(An);

export default PaymentInterval;
