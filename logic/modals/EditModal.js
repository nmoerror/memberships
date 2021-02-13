import React, { useState, useRef } from 'react';
import {
  View,
  Alert,
  Animated,
  KeyboardAvoidingView,
  SafeAreaView,
} from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import TypeModal from './Pickers/TypeModal';
import PaymentIntervalModal from './Pickers/PaymentIntervalModal';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../constants/Colors';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { Currency } from '../constants/Options';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';

// Async Storage
import { getItemAsync, setItemAsync } from '../utils/secureStorage';

const EditModal = ({ route, navigation }) => {
  const { item, memberships } = route.params;
  const [currentMemberships, setCurrentMemberships] = useState(memberships);
  const [modal, setModal] = useState('');
  const slideAnim = useRef(new Animated.Value(200)).current;
  const [errName, setErrName] = useState(null);
  const [errAmount, setErrAmount] = useState(null);
  const [addExpiryDate, setAddExpiryDate] = useState(false);
  const [curr, setCurr] = useState(Currency);
  // Form values
  let now = new Date();
  const [itemID, setItemID] = useState('');
  const [name, setName] = useState('');
  const [type, setType] = useState('Home');
  const [paymentInterval, setPaymentInterval] = useState('Weekly');
  const [weekDay, setWeekDay] = useState(now);
  const [monthDay, setMonthDay] = useState(now);
  const [yearDay, setYearDay] = useState(now);
  const [fortnightDay, setFortnightDay] = useState(now);
  const [quarterDay, setQuarterDay] = useState(now);
  const [amount, setAmount] = useState('');
  const [expiryDate, setExpiryDate] = useState(now);

  useFocusEffect(
    React.useCallback(() => {
      let mounted = true;
      if (mounted) {
        setItemID(item.id);
        setName(item.name);
        setType(item.type);
        setPaymentInterval(item.paymentInterval);
        item.weekDay && setWeekDay(item.weekDay);
        item.fortnightDay && setFortnightDay(item.fortnightDay);
        item.monthDay && setMonthDay(item.monthDay);
        item.quarterDay && setQuarterDay(item.quarterDay);
        item.yearDay && setYearDay(item.yearDay);
        setAmount(item.amount);
        if (item.expiryDate) {
          setExpiryDate(item.expiryDate);
          setAddExpiryDate(true);
        }
        setCurr(Currency);
      }
      return () => {
        mounted = false;
      };
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
    if (paymentInterval === 'Weekly' && !weekDay) {
      alert('Day of the weekly expense is required!');
      return;
    }
    if (paymentInterval === 'Fortnightly') {
      if (!fortnightDay || !moment(fortnightDay).isValid()) {
        alert('Date of upcoming firtnighly expense is required!');
        return;
      }
    }
    if (paymentInterval === 'Monthly') {
      if (!monthDay || !moment(monthDay).isValid()) {
        alert('Day of monthly expense is required!');
        return;
      }
    }
    if (paymentInterval === 'Quarterly') {
      if (!quarterDay || !moment(quarterDay).isValid()) {
        alert('Date of upcoming quarterly expense is required!');
        return;
      }
    }
    if (paymentInterval === 'Yearly') {
      if (!yearDay || !moment(yearDay).isValid()) {
        alert('Date of upcoming yearly expense is required!');
        return;
      }
    }

    let data = {
      name: name,
      type: type,
      paymentInterval: paymentInterval,
      weekDay: paymentInterval === 'Weekly' && weekDay ? weekDay : '',
      fortnightDay:
        paymentInterval === 'Fortnightly' && fortnightDay ? fortnightDay : '',
      monthDay: paymentInterval === 'Monthly' && monthDay ? monthDay : '',
      quarterDay:
        paymentInterval === 'Quarterly' && quarterDay ? quarterDay : '',
      yearDay: paymentInterval === 'Yearly' && yearDay ? yearDay : '',
      amount: amount,
      expiryDate: addExpiryDate ? expiryDate : '',
    };

    if (currentMemberships.length) {
      let indx = currentMemberships.findIndex((e) => e.id === itemID);
      let ghostMemberships = [...currentMemberships];
      ghostMemberships[indx] = {
        ...ghostMemberships[indx],
        ...data,
      };
      pushNewMembership(ghostMemberships);
      return;
    }
    pushNewMembership([data]);
  };

  const pushNewMembership = (a) => {
    setItemAsync('memberships', JSON.stringify(a));
    navigation.goBack();
  };

  const setDateObject = (d) => {
    paymentInterval === 'Weekly' && setWeekDay(d);
    paymentInterval === 'Fortnightly' && setFortnightDay(d);
    paymentInterval === 'Monthly' && setMonthDay(d);
    paymentInterval === 'Quarterly' && setQuarterDay(d);
    paymentInterval === 'Yearly' && setYearDay(d);
  };

  const dateValue = () => {
    if (paymentInterval === 'Weekly') {
      return weekDay;
    }
    if (paymentInterval === 'Fortnightly') {
      return fortnightDay;
    }
    if (paymentInterval === 'Monthly') {
      return monthDay;
    }
    if (paymentInterval === 'Quarterly') {
      return quarterDay;
    }
    if (paymentInterval === 'Yearly') {
      return yearDay;
    }
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
      case 'interval-day':
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
                }}
              >
                <CancelModalText>Cancel</CancelModalText>
              </CancelModal>
              <AcceptModal
                onPress={() => {
                  resetModal('');
                }}
              >
                <SelectModalText>Select</SelectModalText>
              </AcceptModal>
            </ModalButtons>
            <DateTimePicker
              testID='dateTimePicker'
              value={dateValue()}
              mode={'date'}
              display='default'
              onChange={(e, d) => setDateObject(d)}
              minimumDate={new Date()}
            />
          </View>
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
                  setAddExpiryDate(false);
                }}
              >
                <CancelModalText>Cancel</CancelModalText>
              </CancelModal>
              <AcceptModal
                onPress={() => {
                  resetModal('');
                }}
              >
                <SelectModalText>Select</SelectModalText>
              </AcceptModal>
            </ModalButtons>
            <DateTimePicker
              testID='dateTimePicker'
              value={expiryDate}
              mode={'date'}
              display='default'
              minimumDate={new Date()}
              onChange={(e, d) => setExpiryDate(d)}
            />
          </View>
        );
      default:
        return <></>;
    }
  };

  const DayType = () => {
    switch (paymentInterval) {
      case 'Weekly':
        return moment(weekDay).format('LL');
      case 'Fortnightly':
        return moment(fortnightDay).format('LL');
      case 'Monthly':
        return moment(monthDay).format('LL');
      case 'Quarterly':
        return moment(quarterDay).format('LL');
      case 'Yearly':
        return moment(yearDay).format('LL');
    }
  };

  const resetModal = () => {
    Animated.timing(slideAnim, {
      toValue: 200,
      duration: 200,
      useNativeDriver: true,
    }).start();
    setTimeout(() => {
      setModal('');
    }, 200);
  };

  return (
		<SafeAreaView>
			<KeyboardAvoidingView>
				<Bar>
					<CancelItem onPress={() => navigation.goBack()}>
						<Ionicons name="ios-arrow-back" size={30} color={Colors.icons} />
					</CancelItem>
					<Title style={{ color: Colors.title }}>Edit {name}</Title>
					<AddItem onPress={() => validate()}>
						<Ionicons name="checkmark-sharp" size={30} color={Colors.icons} />
					</AddItem>
				</Bar>
				<ScrollView style={{ height: "100%" }}>
					<Form>
						<InputField>
							<InputText err={errName}>Name</InputText>
							<Input
								name="name"
								value={name}
								onChangeText={(e) => {
									setName(e);
									errName && setErrName(null);
								}}
								onFocus={() => {
									resetModal();
								}}
							/>
						</InputField>
						<Division />
						<TouchableOpacity
							onPress={() => {
								setModal("type");
								SelectModal();
							}}
						>
							<InputField>
								<InputText>Group</InputText>
								<Placeholder>{type}</Placeholder>
							</InputField>
						</TouchableOpacity>
						<Division />
					</Form>
					<Form>
						<FormTitle>Payments</FormTitle>
						<TouchableOpacity
							onPress={() => {
								setModal("payment-interval");
								SelectModal();
							}}
						>
							<InputField>
								<InputText>Interval</InputText>
								<Placeholder>{paymentInterval}</Placeholder>
							</InputField>
						</TouchableOpacity>
						<Division />
						<TouchableOpacity
							onPress={() => {
								setModal("interval-day");
								SelectModal();
							}}
						>
							<InputField>
								<InputText>Next Payment Date</InputText>
								<Placeholder>
									<DayType />
								</Placeholder>
							</InputField>
						</TouchableOpacity>
						<Division />
						<InputField err={errAmount}>
							<InputText>Amount ({curr})</InputText>
							<Input
								name="amount"
								value={amount}
								onChangeText={(e) => {
									if (!isNaN(e)) {
										setAmount(e);
										errAmount && setErrAmount(null);
									}
								}}
								onFocus={() => {
									resetModal();
								}}
								keyboardType="numeric"
							/>
						</InputField>
						<Division />
						{addExpiryDate ? (
							<>
								<TouchableOpacity
									onPress={() => {
										setModal("Date");
										SelectModal();
									}}
								>
									<InputField>
										<InputText>Expense Expiry Date</InputText>
										<Placeholder>{moment(expiryDate).format("LL")}</Placeholder>
									</InputField>
								</TouchableOpacity>
								<Division />
							</>
						) : (
							<PaymentDayViewOption
								onPress={() => {
									setAddExpiryDate(true);
									setModal("Date");
									SelectModal();
								}}
							>
								<SetPaymentDayOptionTitle>
									Set expense expiry date
								</SetPaymentDayOptionTitle>
								<AddText>+</AddText>
							</PaymentDayViewOption>
						)}
					</Form>
				</ScrollView>
				<Delete
					bot={
						modal
							? modal === "Date"
								? 100
								: modal === "interval-day"
								? 100
								: 280
							: 100
					}
					onPress={() => {
						Alert.alert(
							"Delete Membership",
							"Permanently delete this record?",
							[
								{
									text: "Cancel",
									onPress: () => {},
								},
								{
									text: "Delete",
									onPress: async () => {
										try {
											let memberships = await getItemAsync("memberships");
											memberships = JSON.parse(memberships);

											let newMemberships = memberships.filter(
												(element) => element.id !== itemID
											);

											await setItemAsync(
												"memberships",
												JSON.stringify(newMemberships)
											);
											navigation.goBack();
										} catch (err) {}
									},
								},
							]
						);
					}}
				>
					<DelText>Delete</DelText>
				</Delete>
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

const Division = styled.View`
  height: 1px;
  background: rgba(30, 30, 30, 0.1);
  margin: 0 20px;
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
  padding: 5px 20px;
  flex-direction: row;
  align-items: center;
  min-height: 50px;
  margin: 5px 0;
  border-radius: 5px;
  text-align: right;
`;

const Placeholder = styled.Text`
  font-weight: bold;
  opacity: 0.9;
  color: ${Colors.icons};
  font-size: 16px;
  text-align: right;
  margin: auto 10px auto auto;
`;

const Input = styled.TextInput`
  flex: 1;
  padding: 10px;
  font-weight: bold;
  color: ${Colors.icons};
  opacity: 0.9;
  font-size: 16px;
  text-align: right;
`;

const InputText = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: ${(props) => (props.err ? props.err : 'rgba(40, 40, 40, 0.8)')};
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
  margin-top: 15px;
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

const Delete = styled.TouchableOpacity`
  position: absolute;
  bottom: ${(props) => props.bot}px;
  width: 95%;
  height: 45px;
  border-radius: 10px;
  border: 1px solid rgba(255, 0, 0, 0.2);
  background: rgba(255, 0, 0, 0.1);
  left: 2.5%;
`;

const DelText = styled.Text`
  color: rgba(225, 30, 30, 0.9);
  font-weight: 700;
  margin: auto;
  font-size: 16px;
`;

export default EditModal;
