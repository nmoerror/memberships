import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, RefreshControl } from 'react-native';
import styled from 'styled-components';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../../constants/Colors';

const AboutStack = ({ route, navigation }) => {
  return (
    <Section>
      <Bar>
        <CancelItem onPress={() => navigation.goBack()}>
          <Ionicons name='ios-arrow-back' size={30} color={Colors.icons} />
        </CancelItem>
        <Title style={{ color: Colors.title }}>About</Title>
      </Bar>
      <Main>
        <Brand> Nmoerror</Brand>
        <Testament>
          Memberships is all about you. Our aim is to deliver your needs at a
          miniscule one time price.
        </Testament>
        <Testament style={{ marginTop: 10 }}>
          All your information is safe and sound stored locally on your phone.
          This might change in the future in order for us to provide sync
          facilities across your devices and be able to offer you a better
          experience and extended facilities.
        </Testament>
        <Testament style={{ marginTop: 10 }}>
          By having purchased this app you become Premium by default and will
          have full access to the exciting features ahead.
        </Testament>
        <Testament style={{ marginTop: 10 }}>
          We wish for us to deliver the tools that you may need to keep track of
          your paid services and wish for you to enjoy this app.
        </Testament>
      </Main>
    </Section>
  );
};

const Section = styled.SafeAreaView``;

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
`;

const Brand = styled.Text`
  font-weight: 600;
  letter-spacing: 2px;
  margin: 5px 5px 10px 0;
`;

const Testament = styled.Text`
  line-height: 20px;
  color: rgba(10, 10, 10, 0.85);
`;

export default AboutStack;
