import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, RefreshControl } from 'react-native';
import styled from 'styled-components';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../constants/Colors';

const SettingsModal = ({ route, navigation }) => {
  return (
    <Section>
      <Bar>
        <CancelItem onPress={() => navigation.goBack()}>
          <Ionicons
            name='ios-arrow-round-back'
            size={40}
            color={Colors.icons}
          />
        </CancelItem>
        <Title style={{ color: Colors.title }}>Settings</Title>
      </Bar>
      <Text>Settings</Text>
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
  top: 5px;
  width: 40px;
  align-items: center;
`;

const Title = styled.Text`
  margin: auto;
  font-size: 20px;
`;

export default SettingsModal;
