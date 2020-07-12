import React, { Fragment, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import styled from 'styled-components';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../constants/Colors';
import i18n from 'i18n-js';

// Async Storage
import {
  getItemAsync,
  setItemAsync,
  deleteItemAsync,
} from '../utils/secureStorage';

const wh = Dimensions.get('window').height;

const MenuScreen = ({ route, navigation }) => {
  return (
    <Section>
      <Bar>
        <Title style={{ color: Colors.title }}>{i18n.t('Menu')}</Title>
      </Bar>
      <Main>
        <MenuItem onPress={() => navigation.push('Me')}>
          <Icon>
            <Ionicons name='ios-contact' size={30} color={Colors.icons} />
          </Icon>
          <ItemName>{i18n.t('Me')}</ItemName>
          <Go>
            <Ionicons name='ios-arrow-forward' size={20} color={Colors.icons} />
          </Go>
        </MenuItem>
        <MenuItem onPress={() => navigation.push('Preferences')}>
          <Icon>
            <Ionicons name='ios-options' size={30} color={Colors.icons} />
          </Icon>
          <ItemName>{i18n.t('Preferences')}</ItemName>
          <Go>
            <Ionicons name='ios-arrow-forward' size={20} color={Colors.icons} />
          </Go>
        </MenuItem>
        <MenuItem onPress={() => {}}>
          <Icon style={{ marginLeft: 0.5, opacity: 0.2 }}>
            <Ionicons name='ios-settings' size={30} color={Colors.icons} />
          </Icon>
          <ItemName style={{ opacity: 0.2 }}>{i18n.t('Settings')}</ItemName>
          <Go style={{ opacity: 0.2 }}>
            <Ionicons name='ios-arrow-forward' size={20} color={Colors.icons} />
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
          <ItemName>{i18n.t('About')}</ItemName>
          <Go>
            <Ionicons name='ios-arrow-forward' size={20} color={Colors.icons} />
          </Go>
        </MenuItem>
      </Main>
      <Signature>
        <Text style={{ color: Colors.titleFaded, letterSpacing: 2 }}>
          {i18n.t('from')}
        </Text>
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
  opacity: 0.7;
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
