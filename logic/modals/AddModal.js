import React, { useState, useEffect } from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import styled from 'styled-components';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

import TypeModal from './Pickers/TypeModal';
import PaymentIntervalModal from './Pickers/PaymentIntervalModal';

// Async Storage
import {
  getItemAsync,
  setItemAsync,
  deleteItemAsync,
} from '../utils/secureStorage';

const AddModal = ({ route, navigation }) => {
  const { memberships } = route.params;
  // Current memberships
  const [currentMemberships, setCurrentMemberships] = useState(memberships);
  useEffect(() => {
    // Current memberships
    setCurrentMemberships(memberships);
    console.log(currentMemberships);
  }, [navigation]);

  // Form values
  const [name, setName] = useState('');
  const [type, setType] = useState('Membership');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [day, setDay] = useState('');
  const [paymentInterval, setPaymentInterval] = useState('Weekly');
  const [amount, setAmount] = useState('');
  const [formObject, setFormObject] = useState();

  // Picker Modal
  const [modal, setModal] = useState('');

  const validate = () => {
    if (!name || !day || !amount) {
      alert(`Name, Payment Day and amount are required !`);
      return;
    }

    let data = {
      name: name,
      type: type,
      startDate: startDate,
      endDate: endDate,
      day: day,
      paymentInterval: paymentInterval,
      amount: amount,
    };

    console.log(data);

    let a = currentMemberships.length ? [...currentMemberships, data] : [data];
    console.log('a =');
    console.log(a);
    pushNewMembership(a);
  };

  const pushNewMembership = (a) => {
    console.log('from push');
    console.log(a);
    setItemAsync('memberships', JSON.stringify(a));
  };

  const SelectModal = () => {
    switch (modal) {
      case 'type':
        return <TypeModal type={type} setType={(e) => setType(e)} />;
      case 'payment-interval':
        return (
          <PaymentIntervalModal
            paymentInterval={paymentInterval}
            setPaymentInterval={(e) => setPaymentInterval(e)}
          />
        );
      default:
        return <></>;
    }
  };

  return (
    <SafeAreaView>
      <Bar>
        <CancelItem onPress={() => navigation.goBack()}>
          <Ionicons name='ios-close' size={40} />
        </CancelItem>
        <Title>New Membership</Title>
        <AddItem onPress={() => validate()}>
          <Ionicons name='ios-add' size={40} />
        </AddItem>
      </Bar>
      <ScrollView style={{ height: '100%' }}>
        <Form>
          <InputField>
            <Text>Name:</Text>
            <Input
              name='name'
              value={name}
              onChangeText={(e) => setName(e)}
              onFocus={() => setModal('')}
            />
          </InputField>
          <TouchableOpacity onPress={() => setModal('type')}>
            <InputField>
              <Text>Type:</Text>
              <Placeholder>{type}</Placeholder>
            </InputField>
          </TouchableOpacity>
          <InputFields>
            <Input
              name='startDate'
              value={startDate}
              onChangeText={(e) => setStartDate(e)}
              placeholder='Start Date'
              onFocus={() => setModal('')}
            />
            <Input
              name='endDate'
              value={endDate}
              onChangeText={(e) => setEndDate(e)}
              placeholder='End Date'
              onFocus={() => setModal('')}
            />
          </InputFields>
        </Form>
        <Form>
          <InputField>
            <Text>Payment Day:</Text>
            <Input
              name='day'
              value={day}
              onChangeText={(e) => setDay(e)}
              placeholder='Payment day'
              onFocus={() => setModal('')}
            />
          </InputField>
          <TouchableOpacity onPress={() => setModal('payment-interval')}>
            <InputField>
              <Text>Payment Interval:</Text>
              <Placeholder>{paymentInterval}</Placeholder>
            </InputField>
          </TouchableOpacity>
          <InputField>
            <Text>Amount paid per Interval:</Text>
            <Input
              name='amount'
              value={amount}
              onChangeText={(e) => setAmount(e)}
              placeholder='14.50'
              onFocus={() => setModal('')}
            />
          </InputField>
        </Form>
      </ScrollView>
      <SelectModal />
    </SafeAreaView>
  );
};

const Bar = styled.View`
  height: 50px;
`;

const Title = styled.Text`
  margin: auto;
  font-size: 20px;
`;

const AddItem = styled.TouchableOpacity`
  position: absolute;
  right: 18px;
  top: 5px;
`;

const CancelItem = styled.TouchableOpacity`
  position: absolute;
  left: 18px;
  top: 5px;
`;

const Form = styled.View`
  margin-bottom: 20px;
`;

const InputField = styled.View`
  padding: 10px 20px
  flex-direction: row;
  align-items: center;
`;

const Placeholder = styled.Text`
  margin-left: 10px;
`;

const InputFields = styled.View`
  padding: 10px 20px
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Input = styled.TextInput`
  padding: 10px;
`;

export default AddModal;
