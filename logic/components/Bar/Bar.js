import React from 'react';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Greet from '../Greet/Greet';

const Bar = ({ home, title, me, memberships, navigation }) => {
  // Home Version
  if (home) {
    return (
      <Section mar={me ? 18 : 5}>
        <Title
          style={{ color: Colors.title }}
          mar={me ? 'auto auto auto 20px' : 'auto'}
        >
          <Greet me={me} />
        </Title>
        {memberships.length && me ? (
          <SubIntro>I have created statistics for you.</SubIntro>
        ) : null}
        <AddItem
          onPress={() =>
            navigation.push('Add', {
              memberships,
            })
          }
        >
          <Ionicons name='ios-add' size={40} color={Colors.icons} />
        </AddItem>
      </Section>
    );
  }

  // Cluster Version
  return (
    <Section>
      <LeftIcon onPress={() => navigation.goBack()}>
        <Ionicons name='ios-arrow-back' size={30} color={Colors.icons} />
      </LeftIcon>
      <Title style={{ color: Colors.title }}>{title}</Title>
      <RightIcon></RightIcon>
    </Section>
  );
};

const Section = styled.View`
  width: 100%;
  height: 50px;
  margin-bottom: ${(props) => (props.mar ? props.mar : 0)};
`;

const Title = styled.Text`
  margin: ${(props) => (props.mar ? props.mar : 'auto')};
  font-size: 20px;
  font-weight: 500;
`;

const SubIntro = styled.Text`
  position: absolute;
  bottom: -2px;
  left: 20px;
  color: ${Colors.titleFaded};
  font-size: 16px;
`;

const AddItem = styled.TouchableOpacity`
  position: absolute;
  right: 8px;
  top: 5px;
  width: 40px;
  align-items: center;
`;

const LeftIcon = styled.TouchableOpacity`
  position: absolute;
  left: 8px;
  top: 10px;
  width: 40px;
  align-items: center;
`;

const RightIcon = styled.TouchableOpacity`
  position: absolute;
  right: 8px;
  top: 5px;
  width: 40px;
  align-items: center;
`;

export default Bar;
