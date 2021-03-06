import React, { Fragment, useState, useCallback } from 'react';
import { Dimensions, Settings } from 'react-native';
import styled from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../constants/Colors';
import { Currency } from '../constants/Options';
import moment from 'moment';
import Cluster from '../components/Cluster/Cluster';
import Bar from '../components/Bar/Bar';
import { TimeDefaults } from '../constants/Options';
import { setModal } from '../store/actions/modal';
import { useSelector, useDispatch } from 'react-redux';

// Async Storage
import {
  getItemAsync,
  setItemAsync,
  deleteItemAsync,
} from '../utils/secureStorage';
import { SafeAreaView } from 'react-native-safe-area-context';

const wh = Dimensions.get('window').height;

const HomeScreen = ({ route, navigation }) => {
  const [ memberships, setMemberships ] = useState([]);
  const [ clusters, setClusters ] = useState([]);
  const [ me, setMe ] = useState('');
  const [ today, setToday ] = useState(moment());
  const [ income, setIncome ] = useState(Settings.get('income') || 0);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const createClusters = (parsedMembers) => {
    let clus = [];
    parsedMembers.forEach((element) => {
      clus.push(element.type);
    });
    setClusters([ ...new Set(clus) ].sort());
  };

  useFocusEffect(
    React.useCallback(() => {
      let isMounted = true;
      (async () => {
        try {
          if (isMounted) {
            setMe(Settings.get('name'));
            let val = await getItemAsync('memberships');
            if (val && isMounted) {
              let parsedMembers = JSON.parse(val);
              setMemberships(parsedMembers);
              createClusters(parsedMembers);
            }
            isMounted && setToday(moment());
            isMounted && setIncome(Settings.get('income' || 0));
          }
        } catch (err) {
        }
      })();

      return () => {
        isMounted = false;
      };
    }, [ route ]),
  );

  const dd = () => {
    //dispatch(setModal());
  };

  useFocusEffect(
    useCallback(() => {
      let onboardingCompleted = auth?.user?.onboarding?.home;
      if (!onboardingCompleted) {
        dd();
      }
    }, []),
  );

  if (!memberships.length) {
    return (
      <Section>
        <Bar
          home={true}
          me={me}
          memberships={memberships}
          navigation={navigation}
        />
        <EmptyView>
          <SecondaryAddText>
            I am your new best expense tracker !
          </SecondaryAddText>
          <AddText>Click the icon to start tracking</AddText>
        </EmptyView>
      </Section>
    );
  }

  return (
    <Section>
      <Bar
        home={true}
        me={me}
        memberships={memberships}
        navigation={navigation}
      />
      <HomeScrollView>
        <Items>
          {clusters.map((cluster) => (
            <Cluster
              key={cluster}
              Currency={Currency}
              memberships={memberships}
              cluster={cluster}
              today={today}
              timeDefaults={TimeDefaults}
              navigation={navigation}
              setMemberships={setMemberships}
              income={income}
            />
          ))}
        </Items>
      </HomeScrollView>
    </Section>
  );
};

const Section = styled.SafeAreaView`
  background: ${Colors.appBg};
  min-height: 100%;
`;

const Items = styled.View``;

const EmptyView = styled.View`
  align-items: center;
  margin: 50% auto;
`;

const AddText = styled.Text`
  font-size: 18px;
  margin-top: 20px;
`;

const SecondaryAddText = styled.Text`
  color: ${Colors.titleFaded};
  font-size: 18px;
`;

const HomeScrollView = styled.ScrollView`
  height: ${wh - wh * 0.21}px;
  padding-right: 10px;
  padding-left: 10px;
  margin-top: -5px;
`;

export default HomeScreen;
