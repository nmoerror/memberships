import React, { Fragment, useEffect, useState, useRef, createRef } from 'react';
import styled from 'styled-components';
import { ScrollView } from 'react-native-gesture-handler';
import { View, Text, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../constants/Colors';
import { Dimensions, TouchableOpacity } from 'react-native';
import Statistics from '../components/Statistics';

// Async Storage
import {
  getItemAsync,
  setItemAsync,
  deleteItemAsync,
} from '../utils/secureStorage';

const ww = Dimensions.get('window').width;

const StatisticsScreen = ({ route, navigation }) => {
  const [memberships, setMemberships] = useState([]);
  let weeklyItems = [];
  let monthlyItems = [];
  let yearlyItems = [];
  const scrollAnim = createRef();

  const weeklyTotal = () => {
    let total = 0;
    memberships.forEach(({ ...item }) => {
      if (item.paymentInterval === 'Weekly') {
        let week = parseFloat(item.amount);
        total += week;
        item.amount = week.toFixed(2);
        weeklyItems.push(item);
      } else if (item.paymentInterval === 'Fortnightly') {
        total += parseFloat(item.amount / 2);
      } else if (item.paymentInterval === 'Monthly') {
        let month = parseFloat(item.amount / 4.3);
        total += month;
        item.amount = month.toFixed(2);
        weeklyItems.push(item);
      } else if (item.paymentInterval === 'Yearly') {
        let year = parseFloat(item.amount / 52.1);
        total += year;
        item.amount = year.toFixed(2);
        weeklyItems.push(item);
      }
    });

    return total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const monthlyTotal = () => {
    let total = 0;
    memberships.forEach(({ ...item }) => {
      if (item.paymentInterval === 'Weekly') {
        let week = parseFloat(item.amount * 4.3);
        total += week;
        item.amount = week.toFixed(2);
        monthlyItems.push(item);
      } else if (item.paymentInterval === 'Fortnightly') {
        total += parseFloat(item.amount * 2.2);
      } else if (item.paymentInterval === 'Monthly') {
        let month = parseFloat(item.amount);
        total += month;
        item.amount = month.toFixed(2);
        monthlyItems.push(item);
      } else if (item.paymentInterval === 'Yearly') {
        let year = parseFloat(item.amount / 12);
        total += year;
        item.amount = year.toFixed(2);
        monthlyItems.push(item);
      }
    });

    return total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const yearlyTotal = () => {
    let total = 0;
    memberships.forEach(({ ...item }) => {
      if (item.paymentInterval === 'Weekly') {
        let week = parseFloat(item.amount * 52.1);
        total += week;
        item.amount = week.toFixed(2);
        yearlyItems.push(item);
      } else if (item.paymentInterval === 'Fortnightly') {
        total += parseFloat(item.amount * 26.0714);
      } else if (item.paymentInterval === 'Monthly') {
        let month = parseFloat(item.amount * 12);
        total += month;
        item.amount = month.toFixed(2);
        yearlyItems.push(item);
      } else if (item.paymentInterval === 'Yearly') {
        let year = parseFloat(item.amount);
        total += year;
        item.amount = year.toFixed(2);
        yearlyItems.push(item);
      }
    });

    return total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        try {
          let val = await getItemAsync('memberships');
          setMemberships(val ? JSON.parse(val) : []);
        } catch (err) {}
      })();
    }, [route])
  );

  return (
    <Section>
      <Bar>
        <Title style={{ color: Colors.title }}>Total Expenses</Title>
        {scrollAnim.current > 0 && (
          <SettingsButton onPress={() => navigation.push('Settings')}>
            <Ionicons name='ios-arrow' size={32} color={Colors.icons} />
          </SettingsButton>
        )}
      </Bar>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        style={{ minHeight: '100%' }}
        ref={scrollAnim}
      >
        <TotalView style={{ flex: 1 }}>
          <SectionTitle>Summary</SectionTitle>
          <TotalItem
            onPress={() => {
              scrollAnim.current.scrollTo({ x: ww, animated: true });
            }}
          >
            <Bubble>
              <IntervalText>Weekly</IntervalText>
            </Bubble>
            <Total>$ {weeklyTotal()}</Total>
          </TotalItem>
          <TotalItem
            onPress={() =>
              scrollAnim.current.scrollTo({ x: ww * 2, animated: true })
            }
          >
            <Bubble>
              <IntervalText>Monthly</IntervalText>
            </Bubble>
            <Total>$ {monthlyTotal()}</Total>
          </TotalItem>
          <TotalItem
            onPress={() => scrollAnim.current.scrollToEnd({ animated: true })}
          >
            <Bubble>
              <IntervalText>Yearly</IntervalText>
            </Bubble>
            <Total>$ {yearlyTotal()}</Total>
          </TotalItem>
        </TotalView>
        <TotalView>
          <SectionTitle>Weekly</SectionTitle>
          <Statistics
            memberships={weeklyItems}
            route={route}
            interval='Weekly'
          />
        </TotalView>
        <TotalView>
          <SectionTitle>Monthly</SectionTitle>
          <Statistics
            memberships={monthlyItems}
            route={route}
            interval='Monthly'
          />
        </TotalView>
        <TotalView>
          <SectionTitle>Yearly</SectionTitle>
          <Statistics
            memberships={yearlyItems}
            route={route}
            interval='Yearly'
          />
        </TotalView>
      </ScrollView>
    </Section>
  );
};

const Section = styled.SafeAreaView``;

const Bar = styled.View`
  height: 50px;
`;

const SettingsButton = styled.TouchableOpacity`
  position: absolute;
  right: 10px;
  top: 8px;
  width: 40px;
  align-items: center;
`;

const Title = styled.Text`
  margin: auto;
  font-size: 20px;
`;

const TotalView = styled.View`
  width: ${ww}px;
  padding: 20px;
  background: white;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  margin-left: 5px;
  margin-top: -10px;
  font-weight: 600;
  color: ${Colors.sectionTitle};
`;

const TotalItem = styled.TouchableOpacity`
  position: relative;
  width: 100%;
  height: 100px;
  padding-right: 20px;
  border-radius: 20px;
  background: white;
  margin: 20px auto;
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.1);
`;

const IntervalText = styled.Text`
  font-weight: 700;
  color: ${Colors.titleFaded};
  color: white;
  margin: auto;
  font-size: 16px;
`;

const Bubble = styled.View`
  position: absolute;
  left: 0;
  top: 0;
  background-color: ${Colors.tabIconSelectedFaded}
  height: 100%;
  width: 100px;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
`;

const Total = styled.Text`
  margin: auto 5% auto auto;
  font-size: 22px;
  font-weight: 500;
  color: ${Colors.statsTotal};
`;

export default StatisticsScreen;
