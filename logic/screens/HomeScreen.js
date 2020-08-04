import React, { Fragment, useState } from 'react';
import { View, Text, Dimensions, Settings } from 'react-native';
import styled from 'styled-components';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../constants/Colors';
import { Currency } from '../constants/Options';
import moment from 'moment';
import Cluster from '../components/Cluster/Cluster';
import Bar from '../components/Bar/Bar';
import { TimeDefaults } from '../constants/Options';

// Async Storage
import {
  getItemAsync,
  setItemAsync,
  deleteItemAsync,
} from '../utils/secureStorage';
import { SafeAreaView } from 'react-native-safe-area-context';

const wh = Dimensions.get('window').height;

const HomeScreen = ({ route, navigation }) => {
  const [memberships, setMemberships] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [me, setMe] = useState('');
  const [today, setToday] = useState(moment());
  const [income, setIncome] = useState(Settings.get('income') || 0);

  const createClusters = (parsedMembers) => {
    let clus = [];
    parsedMembers.forEach((element) => {
      clus.push(element.type);
    });
    setClusters([...new Set(clus)].sort());
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
        } catch (err) {}
      })();
      return () => {
        // clean up
        isMounted = false;
      };
    }, [route])
  );

  if (!memberships.length) {
    return (
      <SafeAreaView>
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
      </SafeAreaView>
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
