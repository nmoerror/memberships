import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../constants/Colors';

const MenuScreen = ({ route, navigation }) => {
  return (
    <Section>
      <Bar>
        <Title style={{ color: Colors.title }}>Menu</Title>
      </Bar>
      <Main>
        <MenuItem onPress={() => navigation.push('Me')}>
          <Icon>
            <Ionicons name='ios-contact' size={30} color={Colors.icons} />
          </Icon>
          <ItemName>Me</ItemName>
          <Go>
            <Ionicons
              name='ios-arrow-forward'
              size={20}
              color={Colors.goIcon}
            />
          </Go>
        </MenuItem>
        <MenuItem onPress={() => navigation.push('Preferences')}>
          <Icon>
            <Ionicons name='ios-options' size={30} color={Colors.icons} />
          </Icon>
          <ItemName>Preferences</ItemName>
          <Go>
            <Ionicons
              name='ios-arrow-forward'
              size={20}
              color={Colors.goIcon}
            />
          </Go>
        </MenuItem>
        <MenuItem onPress={() => {}}>
          <Icon style={{ marginLeft: 0.5, opacity: 0.2 }}>
            <Ionicons name='ios-settings' size={30} color={Colors.icons} />
          </Icon>
          <ItemName style={{ opacity: 0.2 }}>Settings</ItemName>
          <Go style={{ opacity: 0.2 }}>
            <Ionicons
              name='ios-arrow-forward'
              size={20}
              color={Colors.goIcon}
            />
          </Go>
        </MenuItem>
        <MenuItem onPress={() => navigation.push('About')}>
          <Icon>
            <Ionicons
              name='ios-information-circle-outline'
              size={30}
              color={Colors.icons}
            />
          </Icon>
          <ItemName>About</ItemName>
          <Go>
            <Ionicons
              name='ios-arrow-forward'
              size={20}
              color={Colors.goIcon}
            />
          </Go>
        </MenuItem>
      </Main>
      <Signature>
        <Text style={{ color: Colors.titleFaded, letterSpacing: 2 }}>from</Text>
        <Brand>Nmoerror</Brand>
      </Signature>
    </Section>
  );
};

const Section = styled.SafeAreaView`
  height: 100%;
`;

const Bar = styled.View`
  height: 50px;
`;

const Title = styled.Text`
  margin: auto;
  font-size: 20px;
`;

const Main = styled.View`
  padding: 0 10px;
`;

const MenuItem = styled.TouchableOpacity`
  height: 62px;
  padding: 10px 20px;
  flex-direction: row;
  align-items: center;
`;

const Icon = styled.View`
  width: 40px;
`;

const ItemName = styled.Text`
  margin-left: 5px;
`;

const Go = styled.View`
  margin: auto 0 auto auto;
`;

const Signature = styled.View`
  position: absolute;
  bottom: 0px;
  width: 100%;
  padding: 12px 0 40px 20px;
  box-shadow: 0px 10px 10px rgba(0, 0, 0, 0.5);
  background: white;
  border-top-right-radius: 10px;
  border-top-left-radius: 10px;
`;

const Brand = styled.Text`
  letter-spacing: 2px;
`;

export default MenuScreen;
