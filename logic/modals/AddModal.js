import React, { useState, useRef } from 'react';
import {
  SafeAreaView,
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
import i18n from 'i18n-js';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';

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
  const [addPaymentDay, setAddPaymentDay] = useState(false);

  // DatePicker
  const [paymentDate, setPaymentDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || paymentDate;
    setPaymentDate(currentDate);
  };

  // Form values
  const [name, setName] = useState('');
  const [type, setType] = useState('Services');
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
      paymentDate: addPaymentDay ? paymentDate : '',
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
      case 'Date':
        Animated.timing(slideAnim, {
          toValue: -40,
          duration: 200,
          useNativeDriver: true,
        }).start();
        return (
          <View
            style={{
              height: 230,
              width: '100%',
              backgroundColor: 'white',
              position: 'absolute',
              bottom: 50,
              borderTopRightRadius: 40,
              borderTopLeftRadius: 40,
            }}
          >
            <ModalButtons>
              <CancelModal
                onPress={() => {
                  resetModal('');
                  setAddPaymentDay(false);
                }}
              >
                <CancelModalText>{i18n.t('Cancel')}</CancelModalText>
              </CancelModal>
              <AcceptModal
                onPress={() => {
                  resetModal('');
                }}
              >
                <SelectModalText>{i18n.t('Select')}</SelectModalText>
              </AcceptModal>
            </ModalButtons>
            <DateTimePicker
              testID='dateTimePicker'
              value={paymentDate}
              mode={'date'}
              is24Hour={true}
              display='default'
              onChange={onChange}
            />
          </View>
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
            <Ionicons name='ios-arrow-back' size={30} color={Colors.icons} />
          </CancelItem>
          <Title style={{ color: Colors.title }}>{i18n.t('New Expense')}</Title>
          <AddItem onPress={() => validate()}>
            <Ionicons name='ios-checkmark' size={40} color={Colors.icons} />
          </AddItem>
        </Bar>
        <ScrollView style={{ height: '100%' }}>
          <Form>
            <InputField err={errName}>
              <InputText>{i18n.t('Name')}:</InputText>
              <Input
                placeholder={i18n.t('Youtube Premium')}
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
                <InputText>{i18n.t('Group')}:</InputText>
                <Placeholder>{i18n.t(type)}</Placeholder>
              </InputField>
            </TouchableOpacity>
          </Form>
          <Form>
            <FormTitle>{i18n.t('Payments')}</FormTitle>
            <TouchableOpacity
              onPress={() => {
                setModal('payment-interval');
                SelectModal();
              }}
            >
              <InputField>
                <InputText>{i18n.t('Interval')}:</InputText>
                <Placeholder>{i18n.t(paymentInterval)}</Placeholder>
              </InputField>
            </TouchableOpacity>
            <InputField err={errAmount}>
              <InputText>{i18n.t('Amount')}:</InputText>
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
          {addPaymentDay ? (
            <Form>
              <TouchableOpacity
                onPress={() => {
                  setModal('Date');
                  SelectModal();
                }}
              >
                <InputField>
                  <InputText>{i18n.t('Payment Date')}:</InputText>
                  <Placeholder>{moment(paymentDate).format('LL')}</Placeholder>
                </InputField>
              </TouchableOpacity>
            </Form>
          ) : (
            <PaymentDayViewOption
              onPress={() => {
                setAddPaymentDay(true);
              }}
            >
              <SetPaymentDayOptionTitle>
                {i18n.t('Add payment due date')}
              </SetPaymentDayOptionTitle>
              <AddText>+</AddText>
            </PaymentDayViewOption>
          )}
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
  top: 10px;
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

const ModalButtons = styled.View`
  flex-direction: row;
  justify-content: space-evenly;
`;

const AcceptModal = styled.TouchableOpacity`
  padding: 8px 40px;
  background: rgba(0, 255, 0, 0.1);
  border: 1px solid rgba(0, 255, 0, 0.2);
  border-radius: 5px;
`;

const CancelModal = styled.TouchableOpacity`
  padding: 8px 40px;
  border: 1px solid rgba(255, 0, 0, 0.2);
  background: rgba(255, 0, 0, 0.1);
  border-radius: 5px;
`;

const PaymentDayViewOption = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
`;

const SetPaymentDayOptionTitle = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: ${Colors.icons};
  font-size: 16px;
  margin-left: 20px;
`;

const AddText = styled.Text`
  font-weight: 300;
  font-size: 30px;
  margin-top: -5px;
  margin-left: 10px;
  color: ${Colors.icons};
`;

const CancelModalText = styled.Text`
  color: rgba(200, 30, 30, 0.9);
  font-weight: 700;
  font-size: 16px;
`;

const SelectModalText = styled.Text`
  color: rgba(30, 150, 30, 0.9);
  font-weight: 700;
  font-size: 16px;
`;

export default AddModal;
