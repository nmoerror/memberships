import React, { Fragment, useEffect, useState, useRef, createRef } from 'react';
import styled from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../constants/Colors';
import { Dimensions, Settings, ScrollView, View, Text } from 'react-native';
import Statistics from '../components/Statistics';
import { Currency } from '../constants/Options';
import i18n from 'i18n-js';
import { Ionicons } from '@expo/vector-icons';
import { VictoryPie, VictoryLegend } from 'victory-native';

// Async Storage
import {
  getItemAsync,
  setItemAsync,
  deleteItemAsync,
} from '../utils/secureStorage';

const ww = Dimensions.get('window').width;
const wh = Dimensions.get('window').height;

const StatisticsScreen = ({ route, navigation }) => {
  const [memberships, setMemberships] = useState([]);
  const [curr, setCurr] = useState(Currency);
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

  let weeklyItems = [];
  let monthlyItems = [];
  let yearlyItems = [];
  let fortnightlyItems = [];
  let quarterlyItems = [];
  let wT = 0;
  let mT = 0;
  let yT = 0;

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
        let fort = parseFloat(item.amount / 2);
        total += fort;
        item.amount = fort.toFixed(2);
        weeklyItems.push(item);
      } else if (item.paymentInterval === 'Monthly') {
        let month = parseFloat(item.amount / 4.3);
        total += month;
        item.amount = month.toFixed(2);
        weeklyItems.push(item);
      } else if (item.paymentInterval === 'Quarterly') {
        let month = parseFloat(item.amount / (4.3 * 3));
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
    wT = total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const fortnightlyTotal = () => {
    let total = 0;
    memberships.forEach(({ ...item }) => {
      if (item.paymentInterval === 'Weekly') {
        let week = parseFloat(item.amount * 2);
        total += week;
        item.amount = week.toFixed(2);
        fortnightlyItems.push(item);
      } else if (item.paymentInterval === 'Fortnightly') {
        let fort = parseFloat(item.amount);
        total += fort;
        item.amount = fort.toFixed(2);
        fortnightlyItems.push(item);
      } else if (item.paymentInterval === 'Monthly') {
        let month = parseFloat(item.amount / 2.17262);
        total += month;
        item.amount = month.toFixed(2);
        fortnightlyItems.push(item);
      } else if (item.paymentInterval === 'Quarterly') {
        let month = parseFloat(item.amount / (2.17262 * 3));
        total += month;
        item.amount = month.toFixed(2);
        fortnightlyItems.push(item);
      } else if (item.paymentInterval === 'Yearly') {
        let year = parseFloat(item.amount / 26.07);
        total += year;
        item.amount = year.toFixed(2);
        fortnightlyItems.push(item);
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
        let fort = parseFloat(item.amount * 2.2);
        total += fort;
        item.amount = fort.toFixed(2);
        monthlyItems.push(item);
      } else if (item.paymentInterval === 'Monthly') {
        let month = parseFloat(item.amount);
        total += month;
        item.amount = month.toFixed(2);
        monthlyItems.push(item);
      } else if (item.paymentInterval === 'Quarterly') {
        let month = parseFloat(item.amount / 3);
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
    mT = total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  const quarterlyTotal = () => {
    let total = 0;
    memberships.forEach(({ ...item }) => {
      if (item.paymentInterval === 'Weekly') {
        let week = parseFloat(item.amount * 4.3 * 3);
        total += week;
        item.amount = week.toFixed(2);
        quarterlyItems.push(item);
      } else if (item.paymentInterval === 'Fortnightly') {
        let fort = parseFloat(item.amount * 2.2 * 3);
        total += fort;
        item.amount = fort.toFixed(2);
        quarterlyItems.push(item);
      } else if (item.paymentInterval === 'Monthly') {
        let month = parseFloat(item.amount * 3);
        total += month;
        item.amount = month.toFixed(2);
        quarterlyItems.push(item);
      } else if (item.paymentInterval === 'Quarterly') {
        let month = parseFloat(item.amount);
        total += month;
        item.amount = month.toFixed(2);
        quarterlyItems.push(item);
      } else if (item.paymentInterval === 'Yearly') {
        let year = parseFloat(item.amount / 4);
        total += year;
        item.amount = year.toFixed(2);
        quarterlyItems.push(item);
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
        let fort = parseFloat(item.amount * 26.0714);
        total += fort;
        item.amount = fort.toFixed(2);
        yearlyItems.push(item);
      } else if (item.paymentInterval === 'Monthly') {
        let month = parseFloat(item.amount * 12);
        total += month;
        item.amount = month.toFixed(2);
        yearlyItems.push(item);
      } else if (item.paymentInterval === 'Quarterly') {
        let month = parseFloat(item.amount * 4);
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
    yT = total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
    return total.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  };

  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        setCurr(Currency);
        setShowWeekly(Settings.get('showWeekly'));
        setShowFortnightly(Settings.get('showFortnightly'));
        setShowMonthly(Settings.get('showMonthly'));
        setShowQuarterly(Settings.get('showQuarterly'));
        setShowYearly(Settings.get('showYearly'));
        try {
          let val = await getItemAsync('memberships');
          setMemberships(val ? JSON.parse(val) : []);
        } catch (err) {}
      })();
    }, [route])
  );

  useFocusEffect(() => {
    scrollAnim?.current?.flashScrollIndicators();
  });

  const universalPercentage = () => {
    let total = 0;
    let universalMeasures = [
      {
        name: 'Company',
        amount: 0,
      },
      {
        name: 'Debt',
        amount: 0,
      },
      {
        name: 'Family',
        amount: 0,
      },
      {
        name: 'Home',
        amount: 0,
      },
      {
        name: 'Investments',
        amount: 0,
      },
      {
        name: 'Leisure',
        amount: 0,
      },
      {
        name: 'Memberships',
        amount: 0,
      },
      {
        name: 'Education',
        amount: 0,
      },
      {
        name: 'Services',
        amount: 0,
      },
      {
        name: 'Subscriptions',
        amount: 0,
      },
    ];

    memberships.forEach(({ ...item }) => {
      if (item.paymentInterval === 'Weekly') {
        let week = parseFloat(item.amount * 52.1);
        universalMeasures.find(
          (e) => e.name === item.type
        ).amount += parseFloat(week.toFixed(2));
        total += week;
      } else if (item.paymentInterval === 'Fortnightly') {
        let fort = parseFloat(item.amount * 26.0714);
        universalMeasures.find(
          (e) => e.name === item.type
        ).amount += parseFloat(fort.toFixed(2));
        total += fort;
      } else if (item.paymentInterval === 'Monthly') {
        let month = parseFloat(item.amount * 12);
        universalMeasures.find(
          (e) => e.name === item.type
        ).amount += parseFloat(month.toFixed(2));
        total += month;
      } else if (item.paymentInterval === 'Quarterly') {
        let quarter = parseFloat(item.amount * 4);
        universalMeasures.find(
          (e) => e.name === item.type
        ).amount += parseFloat(quarter.toFixed(2));
        total += quarter;
      } else if (item.paymentInterval === 'Yearly') {
        let year = parseFloat(item.amount);
        universalMeasures.find(
          (e) => e.name === item.type
        ).amount += parseFloat(year.toFixed(2));
        total += year;
      }
    });

    universalMeasures.forEach((a) => {
      a.total = total;
    });

    return universalMeasures.filter((measure) => measure.amount > 0);
  };

  return (
    <Section>
      <Bar>
        <Title style={{ color: Colors.title }}>
          {i18n.t('Total Expenses')}
        </Title>
      </Bar>
      <ScrollView
        horizontal={true}
        pagingEnabled={true}
        persistentScrollbar={true}
        style={{ height: wh - 175 }}
        ref={scrollAnim}
      >
        <TotalView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
          {memberships.length ? (
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <VictoryPie
                colorScale={Colors.pieColors}
                innerRadius={60}
                padAngle={2}
                height={Dimensions.get('window').width - 150}
                width={Dimensions.get('window').width}
                data={universalPercentage()}
                x='name'
                y='amount'
                labels={({ datum }) =>
                  `${i18n.t(datum.xName)}\n ${curr}${parseInt(datum.amount)
                    .toFixed(0)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}/y (${Math.round(
                    parseFloat(datum.amount / datum.total) * 100
                  )}%)`
                }
              />
            </View>
          ) : null}
          <SummaryTitle>{i18n.t('Summary')}</SummaryTitle>
          {showWeekly ? (
            <TotalItem
              onPress={() => {
                scrollAnim.current.scrollTo({ x: ww, animated: true });
              }}
            >
              <Bubble>
                <IntervalText>{i18n.t('Weekly')}</IntervalText>
              </Bubble>
              <Total>
                {curr} {weeklyTotal()}
              </Total>
              <Go>
                <Ionicons
                  name='ios-arrow-forward'
                  size={25}
                  color={Colors.icons}
                />
              </Go>
            </TotalItem>
          ) : null}
          {showFortnightly ? (
            <TotalItemNoPress>
              <Bubble>
                <IntervalText>{i18n.t('Fortnightly')}</IntervalText>
              </Bubble>
              <Total>
                {curr} {fortnightlyTotal()}
              </Total>
            </TotalItemNoPress>
          ) : null}
          {showMonthly ? (
            <TotalItem
              onPress={() =>
                scrollAnim.current.scrollTo({
                  x: showWeekly ? ww * 2 : ww,
                  animated: true,
                })
              }
            >
              <Bubble>
                <IntervalText>{i18n.t('Monthly')}</IntervalText>
              </Bubble>
              <Total>
                {curr} {monthlyTotal()}
              </Total>
              <Go>
                <Ionicons
                  name='ios-arrow-forward'
                  size={25}
                  color={Colors.icons}
                />
              </Go>
            </TotalItem>
          ) : null}
          {showQuarterly ? (
            <TotalItemNoPress>
              <Bubble>
                <IntervalText>{i18n.t('Quarterly')}</IntervalText>
              </Bubble>
              <Total>
                {curr} {quarterlyTotal()}
              </Total>
            </TotalItemNoPress>
          ) : null}
          {showYearly ? (
            <TotalItem
              style={{ marginBottom: 40 }}
              onPress={() => {
                scrollAnim.current.scrollToEnd({ animated: true });
              }}
            >
              <Bubble>
                <IntervalText>{i18n.t('Yearly')}</IntervalText>
              </Bubble>
              <Total>
                {curr} {yearlyTotal()}
              </Total>
              <Go>
                <Ionicons
                  name='ios-arrow-forward'
                  size={25}
                  color={Colors.icons}
                />
              </Go>
            </TotalItem>
          ) : null}
        </TotalView>
        {memberships.length ? (
          <>
            {showWeekly ? (
              <View style={{ flexDirection: 'column' }}>
                <EntireSectionTitleRow>
                  <SectionTitle>{i18n.t('Weekly')}</SectionTitle>
                  <SectionTotal>
                    {curr} {wT}
                  </SectionTotal>
                </EntireSectionTitleRow>
                <TotalView showsVerticalScrollIndicator={false}>
                  <Statistics
                    curr={curr}
                    memberships={weeklyItems}
                    route={route}
                    interval='Weekly'
                  />
                </TotalView>
              </View>
            ) : null}
            {showMonthly ? (
              <View style={{ flexDirection: 'column' }}>
                <EntireSectionTitleRow>
                  <SectionTitle>{i18n.t('Monthly')}</SectionTitle>
                  <SectionTotal>
                    {curr} {mT}
                  </SectionTotal>
                </EntireSectionTitleRow>
                <TotalView showsVerticalScrollIndicator={false}>
                  <Statistics
                    curr={curr}
                    memberships={monthlyItems}
                    route={route}
                    interval='Monthly'
                  />
                </TotalView>
              </View>
            ) : null}
            {showYearly ? (
              <View style={{ flexDirection: 'column' }}>
                <EntireSectionTitleRow>
                  <SectionTitle>{i18n.t('Yearly')}</SectionTitle>
                  <SectionTotal>
                    {curr} {yT}
                  </SectionTotal>
                </EntireSectionTitleRow>
                <TotalView showsVerticalScrollIndicator={false}>
                  <Statistics
                    curr={curr}
                    memberships={yearlyItems}
                    route={route}
                    interval='Yearly'
                  />
                </TotalView>
              </View>
            ) : null}
          </>
        ) : null}
      </ScrollView>
    </Section>
  );
};

const Section = styled.SafeAreaView``;

const Bar = styled.View`
  height: 50px;
  color: white;
  background: white;
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

const TotalView = styled.ScrollView`
  width: ${ww}px;
  padding: 0px 20px 0px 20px;
  background: white;
`;

const SectionTitle = styled.Text`
  font-size: 18px;
  margin-left: 20px;
  font-weight: 600;
  color: ${Colors.sectionTitle};
`;

const SummaryTitle = styled.Text`
  font-size: 18px;
  margin-top: 20px;
  font-weight: 600;
  color: ${Colors.sectionTitle};
`;

const TotalItem = styled.TouchableOpacity`
  flex-direction: row;
  position: relative;
  width: 100%;
  height: 100px;
  padding-right: 30px;
  border-radius: 20px;
  background: white;
  margin: 10px auto;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
`;

const TotalItemNoPress = styled.View`
  position: relative;
  width: 100%;
  height: 100px;
  padding-right: 42.5px;
  border-radius: 20px;
  background: white;
  margin: 10px auto;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
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

const Go = styled.View`
  margin: auto 0 auto 0;
  opacity: 0.7;
`;

const Total = styled.Text`
  margin: auto 5% auto auto;
  font-size: 22px;
  font-weight: 500;
  color: ${Colors.statsTotal};
`;

const EntireSectionTitleRow = styled.View`
  flex-direction: row;
  align-items: center;
  height: 35px;
  justify-content: space-between;
  padding-right: 20px;
`;
const SectionTotal = styled.Text`
  font-size: 18px;
  font-weight: 600;
  color: ${Colors.sectionTitleTotal};
`;
export default StatisticsScreen;
