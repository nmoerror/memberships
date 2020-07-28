import React from 'react';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import Greet from '../Greet/Greet';

const Bar = ({ me, memberships, navigation }) => {
  return (
    <ThisSection mar={me ? 18 : 5}>
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
    </ThisSection>
  );
};

const ThisSection = styled.View`
  height: 50px;
  margin-bottom: ${(props) => props.mar}px;
`;

const Title = styled.Text`
  margin: ${(props) => props.mar};
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

export default Bar;
