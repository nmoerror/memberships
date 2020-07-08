import React, { Fragment, useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  Alert,
  Animated,
  KeyboardAvoidingView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import styled from 'styled-components';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import CurrencyModal from '../../modals/Pickers/CurrencyModal';
import LanguageModal from '../../modals/Pickers/LanguageModal';

const wh = Dimensions.get('window').height;

const PreferencesStack = ({ route, navigation }) => {
  const [modal, setModal] = useState('');
  const slideAnim = useRef(new Animated.Value(200)).current;
  const [currency, setCurrency] = useState('Dollar');
  const [language, setLanguage] = useState('English');

  const SelectModal = () => {
    switch (modal) {
      case 'currency':
        Animated.timing(slideAnim, {
          toValue: 0 - 100,
          duration: 200,
          useNativeDriver: true,
        }).start();
        return (
          <CurrencyModal
            currency={currency}
            setCurrency={(e) => setCurrency(e)}
          />
        );
      case 'language':
        Animated.timing(slideAnim, {
          toValue: 0 - 100,
          duration: 200,
          useNativeDriver: true,
        }).start();
        return (
          <LanguageModal
            language={language}
            setLanguage={(e) => setLanguage(e)}
          />
        );
      default:
        return <></>;
    }
  };

  const resetModal = () => {
    setModal('');
    Animated.timing(slideAnim, {
      toValue: 200,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Section>
      <KeyboardAvoidingView>
        <Bar>
          <CancelItem onPress={() => navigation.goBack()}>
            <Ionicons name='ios-arrow-back' size={30} color={Colors.icons} />
          </CancelItem>
          <Title style={{ color: Colors.title }}>Preferences</Title>
        </Bar>

        <Main>
          <Form>
            <TouchableOpacity
              onPress={() => {
                setModal('currency');
                SelectModal();
              }}
            >
              <InputField>
                <InputText>Currency:</InputText>
                <Placeholder>{currency}</Placeholder>
              </InputField>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModal('language');
                SelectModal();
              }}
            >
              <InputField>
                <InputText>Language:</InputText>
                <Placeholder>{language}</Placeholder>
              </InputField>
            </TouchableOpacity>
          </Form>
        </Main>
        <Text>DarkMode</Text>
        <Text>My Expenses Groups</Text>
        <Text>My Expenses Types</Text>
        <AnimatedSlide style={{ transform: [{ translateY: slideAnim }] }}>
          <SelectModal />
        </AnimatedSlide>
      </KeyboardAvoidingView>
    </Section>
  );
};

const Anim = styled.View``;

const AnimatedSlide = Animated.createAnimatedComponent(Anim);

const Section = styled.SafeAreaView`
  height: 100%;
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
  height: 100%;
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
  width: 100px;
`;

const Placeholder = styled.Text`
  margin-left: 10px;
  font-weight: bold;
  opacity: 0.9;
  color: ${Colors.icons};
  font-size: 16px;
`;

export default PreferencesStack;
