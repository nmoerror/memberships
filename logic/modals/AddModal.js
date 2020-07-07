import React, { useState, useEffect, useRef } from 'react';
import {
  SafeAreaView,
  Text,
  View,
  Animated,
  KeyboardAvoidingView,
} from 'react-native';
import styled from 'styled-components';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';
import { useFocusEffect } from '@react-navigation/native';
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
  const [currentMemberships, setCurrentMemberships] = useState(memberships);
  const [modal, setModal] = useState('');
  const slideAnim = useRef(new Animated.Value(200)).current;
  const [errName, setErrName] = useState(null);
  const [errAmount, setErrAmount] = useState(null);

  // Form values
  const [name, setName] = useState('');
  const [type, setType] = useState('Membership');
  //const [startDate, setStartDate] = useState('');
  //const [endDate, setEndDate] = useState('');
  //const [day, setDay] = useState('');
  const [paymentInterval, setPaymentInterval] = useState('Weekly');
  const [amount, setAmount] = useState('');

  useFocusEffect(
    React.useCallback(() => {
      setCurrentMemberships(memberships);
    }, [route])
  );

  const validate = () => {
    if (!name) {
      setErrName('rgba(255,0,0,0.1)');
      return;
    }
    if (!amount) {
      setErrAmount('rgba(255,0,0,0.1)');
      return;
    }

    let data = {
      id: `id_${Math.floor(new Date().getTime() / Math.random())}`,
      name: name,
      type: type,
      //  startDate: startDate,
      //  endDate: endDate,
      //  day: day,
      paymentInterval: paymentInterval,
      amount: amount,
    };

    let a = currentMemberships.length ? [...currentMemberships, data] : [data];

    pushNewMembership(a);
  };

  const pushNewMembership = (a) => {
    setItemAsync('memberships', JSON.stringify(a));
    navigation.goBack();
  };

  const SelectModal = () => {
    switch (modal) {
      case 'type':
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
        return <TypeModal type={type} setType={(e) => setType(e)} />;
      case 'payment-interval':
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
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

  const resetModal = () => {
    setModal('');
    Animated.timing(slideAnim, {
      toValue: 200,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <SafeAreaView>
      <KeyboardAvoidingView>
        <Bar>
          <CancelItem onPress={() => navigation.goBack()}>
            <Ionicons
              name='ios-arrow-round-back'
              size={40}
              color={Colors.icons}
            />
          </CancelItem>
          <Title style={{ color: Colors.title }}>New Membership</Title>
          <AddItem onPress={() => validate()}>
            <Ionicons name='ios-checkmark' size={40} color={Colors.icons} />
          </AddItem>
        </Bar>
        <ScrollView style={{ height: '100%' }}>
          <Form>
            <InputField err={errName}>
              <InputText>Name:</InputText>
              <Input
                placeholder='Youtube Premium'
                name='name'
                value={name}
                onChangeText={(e) => {
                  setName(e);
                  setErrName(null);
                }}
                onFocus={() => {
                  resetModal();
                }}
              />
            </InputField>
            <TouchableOpacity
              onPress={() => {
                setModal('type');
                SelectModal();
              }}
            >
              <InputField>
                <InputText>Type:</InputText>
                <Placeholder>{type}</Placeholder>
              </InputField>
            </TouchableOpacity>
          </Form>
          <Form>
            <FormTitle>Payments</FormTitle>
            <TouchableOpacity
              onPress={() => {
                setModal('payment-interval');
                SelectModal();
              }}
            >
              <InputField>
                <InputText>Interval:</InputText>
                <Placeholder>{paymentInterval}</Placeholder>
              </InputField>
            </TouchableOpacity>
            <InputField err={errAmount}>
              <InputText>Amount:</InputText>
              <Input
                name='amount'
                value={amount}
                onChangeText={(e) => {
                  if (!isNaN(e)) {
                    setAmount(e);
                    setErrAmount(null);
                  }
                }}
                placeholder=''
                onFocus={() => {
                  resetModal();
                }}
                keyboardType='numeric'
              />
            </InputField>
          </Form>
        </ScrollView>
        <AnimatedSlide style={{ transform: [{ translateY: slideAnim }] }}>
          <SelectModal />
        </AnimatedSlide>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const Anim = styled.View``;

const AnimatedSlide = Animated.createAnimatedComponent(Anim);

const Bar = styled.View`
  height: 50px;
`;

const Title = styled.Text`
  margin: auto;
  font-size: 20px;
`;

const AddItem = styled.TouchableOpacity`
  position: absolute;
  right: 8px;
  top: 5px;
  width: 40px;
  align-items: center;
`;

const CancelItem = styled.TouchableOpacity`
  position: absolute;
  left: 8px;
  top: 5px;
  width: 40px;
  align-items: center;
`;

const Form = styled.View`
  margin-bottom: 20px;
  padding: 0 10px;
`;

const FormTitle = styled.Text`
  font-size: 20px;
  padding: 0 20px;
  margin: 5px 0;
  color: ${Colors.icons};
  font-weight: bold;
  opacity: 0.8;
`;

const InputField = styled.View`
  padding: 5px 20px
  flex-direction: row;
  align-items: center;
  min-height: 50px;
  background: ${(props) => (props.err ? props.err : 'rgba(180,180,180,0.1)')};
  margin: 5px;
  border-radius: 5px;
`;

const Placeholder = styled.Text`
  margin-left: 10px;
  font-weight: bold;
  opacity: 0.9;
  color: ${Colors.icons};
  font-size: 16px;
`;

const Input = styled.TextInput`
  flex: 1;
  padding: 10px;
  font-weight: bold;
  color: ${Colors.icons};
  opacity: 0.9;
  font-size: 16px;
`;

const InputText = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(40, 40, 40, 0.8);
  font-size: 16px;
`;

export default AddModal;
