import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, RefreshControl } from 'react-native';
import styled from 'styled-components';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../../constants/Colors';

import {
  getItemAsync,
  setItemAsync,
  deleteItemAsync,
} from '../../utils/secureStorage';

const MeStack = ({ route, navigation }) => {
  const [name, setName] = useState('');
  const [errName, setErrName] = useState();
  const [title, setTitle] = useState('');
  const [email, setEmail] = useState('');

  return (
    <Section>
      <Bar>
        <CancelItem onPress={() => navigation.goBack()}>
          <Ionicons name='ios-arrow-back' size={30} color={Colors.icons} />
        </CancelItem>
        <Title style={{ color: Colors.title }}>Me</Title>
      </Bar>
      <Main>
        <Form>
          <InputField err={errName}>
            <InputText>Name:</InputText>
            <Input
              name='name'
              value={name}
              onChangeText={(e) => {
                setName(e);
              }}
            />
          </InputField>
          <InputField>
            <InputText>Title:</InputText>
            <Input
              title='title'
              value={title}
              onChangeText={(e) => {
                setTitle(e);
              }}
            />
          </InputField>
          <InputField>
            <InputText>Email:</InputText>
            <Input
              email='email'
              value={email}
              onChangeText={(e) => {
                setEmail(e);
              }}
            />
          </InputField>
        </Form>
      </Main>
    </Section>
  );
};

const Section = styled.SafeAreaView`
  padding: 0 10px;
`;

const Bar = styled.View`
  height: 50px;
`;

const CancelItem = styled.TouchableOpacity`
  position: absolute;
  left: 8px;
  top: 12px;
  width: 40px;
  align-items: center;
`;

const Title = styled.Text`
  margin: auto;
  font-size: 20px;
`;
const Main = styled.View`
  padding: 10px 0;
`;

const Form = styled.View`
  margin-bottom: 20px;
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

const InputText = styled.Text`
  font-size: 15px;
  font-weight: 600;
  color: rgba(40, 40, 40, 0.8);
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

export default MeStack;
