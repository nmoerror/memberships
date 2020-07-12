import React, { Fragment, useEffect, useState, useRef } from 'react';
import {
  Text,
  Animated,
  KeyboardAvoidingView,
  TouchableOpacity,
  Settings,
  Switch,
} from 'react-native';
import styled from 'styled-components';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import CurrencyModal from '../../modals/Pickers/CurrencyModal';
import i18n from 'i18n-js';

const PreferencesStack = ({ route, navigation }) => {
  const [modal, setModal] = useState('');
  const slideAnim = useRef(new Animated.Value(200)).current;

  const [currency, setCurrency] = useState(
    Settings.get('currency') || 'Dollar'
  );
  const [showWeekly, setShowWeekly] = useState(
    Settings.get('showWeekly') || true
  );
  const [showFortnightly, setShowFortnightly] = useState(
    Settings.get('showFortnightly') || true
  );
  const [showMonthly, setShowMonthly] = useState(
    Settings.get('showMonthly') || true
  );
  const [showQuarterly, setShowQuarterly] = useState(
    Settings.get('showQuarterly') || true
  );
  const [showYearly, setShowYearly] = useState(
    Settings.get('showYearly') || true
  );

  useFocusEffect(
    React.useCallback(() => {
      setCurrency(Settings.get('currency'));
      setShowWeekly(Settings.get('showWeekly'));
      setShowFortnightly(Settings.get('showFortnightly'));
      setShowMonthly(Settings.get('showMonthly'));
      setShowQuarterly(Settings.get('showQuarterly'));
      setShowYearly(Settings.get('showYearly'));
    }, [route])
  );

  const save = () => {
    Settings.set({ currency });
    Settings.set({ showWeekly });
    Settings.set({ showFortnightly });
    Settings.set({ showMonthly });
    Settings.set({ showQuarterly });
    Settings.set({ showYearly });
    navigation.goBack();
  };

  const SelectModal = () => {
    switch (modal) {
      case 'currency':
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }).start();
        return (
          <CurrencyModal
            currency={currency}
            setCurrency={(e) => setCurrency(e)}
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
          <Title style={{ color: Colors.title }}>{i18n.t('Preferences')}</Title>
          <SaveItem onPress={() => save()}>
            <Ionicons name='ios-checkmark' size={45} color={Colors.icons} />
          </SaveItem>
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
                <InputText>{i18n.t('Currency')}:</InputText>
                <Placeholder>{i18n.t(`${currency}`)}</Placeholder>
              </InputField>
            </TouchableOpacity>
            <SectionTitle>{i18n.t('Display')}</SectionTitle>
            <MenuItem>
              <ItemName>{i18n.t('Weekly Statistics')}</ItemName>
              <Go>
                <Switch
                  trackColor={showWeekly ? 'white' : '#f4f3f4'}
                  thumbColor={'white'}
                  ios_backgroundColor='white'
                  onValueChange={() =>
                    setShowWeekly((previousState) => !previousState)
                  }
                  value={showWeekly}
                />
              </Go>
            </MenuItem>
            <MenuItem>
              <ItemName>{i18n.t('Fortnightly Statistics')}</ItemName>
              <Go>
                <Switch
                  trackColor={showFortnightly ? 'white' : '#f4f3f4'}
                  thumbColor={'white'}
                  ios_backgroundColor='white'
                  onValueChange={() =>
                    setShowFortnightly((previousState) => !previousState)
                  }
                  value={showFortnightly}
                />
              </Go>
            </MenuItem>
            <MenuItem>
              <ItemName>{i18n.t('Monthly Statistics')}</ItemName>
              <Go>
                <Switch
                  trackColor={showMonthly ? 'white' : '#f4f3f4'}
                  thumbColor={'white'}
                  ios_backgroundColor='white'
                  onValueChange={() =>
                    setShowMonthly((previousState) => !previousState)
                  }
                  value={showMonthly}
                />
              </Go>
            </MenuItem>
            <MenuItem>
              <ItemName>{i18n.t('Quarterly Statistics')}</ItemName>
              <Go>
                <Switch
                  trackColor={showQuarterly ? 'white' : '#f4f3f4'}
                  thumbColor={'white'}
                  ios_backgroundColor='white'
                  onValueChange={() =>
                    setShowQuarterly((previousState) => !previousState)
                  }
                  value={showQuarterly}
                />
              </Go>
            </MenuItem>
            <MenuItem>
              <ItemName>{i18n.t('Yearly Statistics')}</ItemName>
              <Go>
                <Switch
                  trackColor={showYearly ? 'white' : '#f4f3f4'}
                  thumbColor={'white'}
                  ios_backgroundColor='white'
                  onValueChange={() =>
                    setShowYearly((previousState) => !previousState)
                  }
                  value={showYearly}
                />
              </Go>
            </MenuItem>
          </Form>
        </Main>
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
  height: 100%;
  padding: 10px 0;
`;

const Form = styled.View`
  margin-bottom: 20px;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  margin-left: 20px;
  margin-top: 20px;
  margin-bottom: 15px;
  font-weight: 600;
  color: ${Colors.sectionTitle};
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

const MenuItem = styled.View`
  padding: 10px 20px;
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

export default PreferencesStack;