import React, { useState } from 'react';
import { Settings } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const MeStack = ({ route, navigation }) => {
  const [name, setName] = useState(Settings.get('name') || '');

  const saveMe = () => {
    Settings.set({ name: name });
    navigation.goBack();
  };

  return (
    <Section>
      <Bar>
        <CancelItem onPress={() => navigation.goBack()}>
          <Ionicons name='ios-arrow-back' size={30} color={Colors.icons} />
        </CancelItem>
        <Title style={{ color: Colors.title }}>Me</Title>
        <SaveItem onPress={() => saveMe()}>
          <Ionicons name='ios-checkmark' size={45} color={Colors.icons} />
        </SaveItem>
      </Bar>
      <Main>
        <Form>
          <InputField>
            <InputText>Name:</InputText>
            <Input
              name='name'
              value={name}
              onChangeText={(e) => {
                setName(e);
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
  top: 10px;
  width: 40px;
  align-items: center;
`;

const SaveItem = styled.TouchableOpacity`
  position: absolute;
  right: 8px;
  top: 1px;
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
  background: rgba(180,180,180,0.1);
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
