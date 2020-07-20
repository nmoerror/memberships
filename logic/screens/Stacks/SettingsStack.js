import React, { useState } from 'react';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';

const SettingsStack = ({ route, navigation }) => {
  const [notifyOnDueDate, setNotifyOnDueDate] = useState(false);
  const toggleDueDate = () =>
    setNotifyOnDueDate((previousState) => !previousState);

  const [notifyOnWeek, setNotifyOnWeek] = useState(false);
  const toggleWeek = () => setNotifyOnWeek((previousState) => !previousState);

  const [notifyOnMonth, setNotifyOnMonth] = useState(false);
  const toggleMonth = () => setNotifyOnMonth((previousState) => !previousState);

  return (
    <Section>
      <Bar>
        <CancelItem onPress={() => navigation.goBack()}>
          <Ionicons name='ios-arrow-back' size={30} color={Colors.icons} />
        </CancelItem>
        <Title style={{ color: Colors.title }}>Settings</Title>
      </Bar>
      <Main>
        <SectionTitle>Notifications</SectionTitle>
        <MenuItem>
          <ItemName>On expense due date</ItemName>
          <Go>
            <Switch
              trackColor={notifyOnDueDate ? 'white' : '#f4f3f4'}
              thumbColor={'white'}
              ios_backgroundColor='white'
              onValueChange={toggleDueDate}
              value={notifyOnDueDate}
            />
          </Go>
        </MenuItem>
        <MenuItem>
          <ItemName>Start of the week summary</ItemName>
          <Go>
            <Switch
              trackColor={notifyOnDueDate ? 'white' : '#f4f3f4'}
              thumbColor={'white'}
              ios_backgroundColor='white'
              onValueChange={toggleWeek}
              value={notifyOnWeek}
            />
          </Go>
        </MenuItem>
        <MenuItem>
          <ItemName>Start of the month summary</ItemName>
          <Go>
            <Switch
              trackColor={notifyOnDueDate ? 'white' : '#f4f3f4'}
              thumbColor={'white'}
              ios_backgroundColor='white'
              onValueChange={toggleMonth}
              value={notifyOnMonth}
            />
          </Go>
        </MenuItem>
      </Main>
    </Section>
  );
};

const Section = styled.SafeAreaView`
  padding: 0 10px;
`;

const Switch = styled.Switch``;

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
  padding: 10px 20px;
  height: 80%;
`;

const SectionTitle = styled.Text`
  font-size: 20px;
  margin: 5px 0 10px;
  color: ${Colors.icons};
  font-weight: bold;
  opacity: 0.8;
`;

const MenuItem = styled.View`
  padding: 10px 0;
  flex-direction: row;
  align-items: center;
`;

const ItemName = styled.Text`
  margin-left: 5px;
`;

const Go = styled.View`
  margin: auto 0 auto auto;
  opacity: 0.7;
`;

export default SettingsStack;
