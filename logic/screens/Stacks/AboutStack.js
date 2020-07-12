import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import Colors from '../../constants/Colors';
import i18n from 'i18n-js';

const AboutStack = ({ route, navigation }) => {
  return (
    <Section>
      <Bar>
        <CancelItem onPress={() => navigation.goBack()}>
          <Ionicons name='ios-arrow-back' size={30} color={Colors.icons} />
        </CancelItem>
        <Title style={{ color: Colors.title }}> {i18n.t('About')}</Title>
      </Bar>
      <Main>
        <Brand> Nmoerror</Brand>
        <Testament>{i18n.t('Speech1')}</Testament>
        <Testament>{i18n.t('Speech2')}</Testament>
        <Testament>{i18n.t('Speech3')}</Testament>
        <Testament>{i18n.t('Speech4')}</Testament>
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
  margin-bottom: 10px;
`;

export default AboutStack;
