import React, { Fragment, useState } from 'react';
import { View, Text, Dimensions, Settings } from 'react-native';
import styled from 'styled-components';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../../constants/Colors';
import moment from 'moment';

import FamilyLogo from '../../../assets/images/family.png';
import CompanyLogo from '../../../assets/images/company.png';
import DebtLogo from '../../../assets/images/debt.png';
import EducationLogo from '../../../assets/images/education.png';
import HomeLogo from '../../../assets/images/home.png';
import InvestmentsLogo from '../../../assets/images/investment.png';
import LeisureLogo from '../../../assets/images/leisure.png';
import MembershipLogo from '../../../assets/images/membership.png';
import ServiceLogo from '../../../assets/images/service.png';
import SubscriptionLogo from '../../../assets/images/subscription.png';
import WorkLogo from '../../../assets/images/work.png';

// Async Storage
import {
  getItemAsync,
  setItemAsync,
  deleteItemAsync,
} from '../../utils/secureStorage';

const Cluster = ({
  Currency,
  memberships,
  cluster,
  today,
  timeDefaults,
  navigation,
  setMemberships,
  income,
}) => {
  //TEST
  const reset = async () => {
    try {
      let val = await getItemAsync('memberships');
      if (val) {
        let parsedMembers = JSON.parse(val);
        setMemberships(parsedMembers);
        // createClusters(parsedMembers);
      }
    } catch (err) {}
  };

  const refactorDate = (item, itemID) => {
    if (memberships.length) {
      let indx = memberships.findIndex((e) => e.id === itemID);
      let ghostMemberships = [...memberships];
      ghostMemberships[indx] = {
        ...ghostMemberships[indx],
        weekDay:
          item === 'Weekly'
            ? moment(ghostMemberships[indx].weekDay).add(7, 'd')
            : '',
        fortnightDay:
          item === 'Fortnightly'
            ? moment(ghostMemberships[indx].fortnightDay).add(2, 'w')
            : '',
        monthDay:
          item === 'Monthly'
            ? moment(ghostMemberships[indx].monthDay).add(1, 'M')
            : '',
        quarterDay:
          item === 'Quarterly'
            ? moment(ghostMemberships[indx].quarterDay).add(1, 'Q')
            : '',
        yearDay:
          item === 'Yearly'
            ? moment(ghostMemberships[indx].yearDay).add(1, 'y')
            : '',
      };
      pushNewMembership(ghostMemberships);
      reset();
    }
  };

  const pushNewMembership = (a) => {
    setItemAsync('memberships', JSON.stringify(a));
  };

  const NextPayment = (item) => {
    switch (item.paymentInterval) {
      case 'Weekly':
        if (item.weekDay && moment(item.weekDay).isBefore(today, 'day')) {
          refactorDate('Weekly', item.id);
          return;
        }
        return item.weekDay
          ? moment(item.weekDay).calendar(null, timeDefaults)
          : '';
      case 'Fortnightly':
        if (
          item.fortnightDay &&
          moment(item.fortnightDay).isBefore(today, 'day')
        ) {
          refactorDate('Fortnightly', item.id);
          return;
        }
        return item.fortnightDay
          ? moment(item.fortnightDay).calendar(null, timeDefaults)
          : '';
      case 'Monthly':
        if (item.monthDay && moment(item.monthDay).isBefore(today, 'day')) {
          refactorDate('Monthly', item.id);
          return;
        }
        return item.monthDay
          ? moment(item.monthDay).calendar(null, timeDefaults)
          : '';
      case 'Quarterly':
        if (item.quarterDay && moment(item.quarterDay).isBefore(today, 'day')) {
          refactorDate('Quarterly', item.id);
          return;
        }
        return item.quarterDay
          ? moment(item.quarterDay).calendar(null, timeDefaults)
          : '';
      case 'Yearly':
        if (item.yearDay && moment(item.yearDay).isBefore(today, 'day')) {
          refactorDate('Yearly', item.id);
          return;
        }
        return item.yearDay
          ? moment(item.yearDay).calendar(null, timeDefaults)
          : '';
      default:
        return '';
    }
  };

  const setClusterLogo = () => {
    switch (cluster) {
      case 'Company':
        return CompanyLogo;
      case 'Debt':
        return DebtLogo;
      case 'Family':
        return FamilyLogo;
      case 'Home':
        return HomeLogo;
      case 'Investments':
        return InvestmentsLogo;
      case 'Leisure':
        return LeisureLogo;
      case 'Memberships':
        return MembershipLogo;
      case 'Education':
        return EducationLogo;
      case 'Services':
        return ServiceLogo;
      case 'Subscriptions':
        return SubscriptionLogo;
      case 'Work':
        return WorkLogo;
      default:
        return FamilyLogo;
    }
  };

  return (
    <ThisSection>
      <ClusterHeaderSection
        onPress={() =>
          navigation.push('Cluster', {
            sectionName: cluster,
            percentage: cluster.length > 5 ? 80 : 20,
            income: income,
            memberships: memberships,
          })
        }
      >
        <IconTitleView>
          <ClusterLogo source={setClusterLogo()} />
          <ClusterTitle>{cluster}</ClusterTitle>
        </IconTitleView>
        <Ionicons name='ios-arrow-forward' size={20} color={Colors.goIcon} />
      </ClusterHeaderSection>
      <Division />
      {memberships.map((item) => {
        if (item.type === cluster) {
          return (
            <Fragment key={item.id}>
              <Item
                onPress={() => navigation.push('Edit', { item, memberships })}
              >
                <View>
                  <ItemName>{item.name}</ItemName>
                  <ItemType>{NextPayment(item)}</ItemType>
                </View>
                <More>
                  <Row>
                    <Text
                      style={{
                        marginRight: 2,
                        marginTop: 1,
                        fontSize: 16,
                      }}
                    >
                      <Currency />
                    </Text>
                    <AmountText>
                      {parseFloat(item.amount)
                        .toFixed(2)
                        .slice(
                          0,
                          parseFloat(item.amount).toFixed(2).indexOf('.')
                        )
                        .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '.'}
                    </AmountText>
                    <SecondaryText>
                      {parseFloat(item.amount).toFixed(2).split('.')[1]}
                    </SecondaryText>
                  </Row>
                  <ItemInterval>{item.paymentInterval}</ItemInterval>
                </More>
              </Item>
            </Fragment>
          );
        }
      })}
    </ThisSection>
  );
};

const ThisSection = styled.View`
  background: white;
  margin: 10px 0;
  border-radius: 10px;
  padding: 10px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.03);
`;

const ClusterHeaderSection = styled.TouchableOpacity`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin: 0 5px 10px 5px;
`;

const IconTitleView = styled.View`
  flex-direction: row;
  align-items: center;
`;

const ClusterLogo = styled.Image`
  height: 23px;
  width: 23px;
`;

const ClusterTitle = styled.Text`
  font-size: 18.5px;
  font-weight: 600;
  margin-left: 14px;
  color: ${Colors.sectionTitle};
`;

const Item = styled.TouchableOpacity`
  height: 52px;
  padding: 0px 5px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const ItemName = styled.Text`
  font-size: 16px;
  font-weight: 500;
`;

const ItemType = styled.Text`
  color: ${Colors.titleFaded};
  font-size: 12px;
  margin-top: 2px;
`;

const ItemInterval = styled.Text`
  color: ${Colors.titleFaded};
  font-size: 12px;
  margin: 2px 0 auto auto;
`;

const Division = styled.View`
  height: 1px;
  width: 100%;
  background: ${Colors.divisionSilverFaded};
  margin-bottom: 5px;
`;

const More = styled.View`
  color: ${Colors.titleFaded};
  font-size: 18px;
`;

const Row = styled.View`
  flex-direction: row;
`;

const AmountText = styled.Text`
  font-weight: 600;
  font-size: 16px;
`;

const SecondaryText = styled.Text`
  color: ${Colors.titleFaded};
  margin: auto auto 2px 0px;
  font-size: 13px;
`;

export default Cluster;
