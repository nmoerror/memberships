import React, { useState } from 'react';
import { View, Text, Dimensions, Settings } from 'react-native';
import styled from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';
import Bar from '../../../components/Bar/Bar';
import Colors from '../../../constants/Colors';
import Svg, { Circle } from 'react-native-svg';
import { universalPercentage } from '../../../constants/Helpers';
import { Currency } from '../../../constants/Options';

const ClusterStack = ({ route, navigation }) => {
  const { sectionName, memberships } = route.params;
  const [curr, setCurr] = useState(Currency);
  const [sectionTotal, setSectionTotal] = useState({});
  const [income, setIncome] = useState(Settings.get('income') || 0);

  const calculateTotal = () => {
    let a = universalPercentage(memberships);
    a = a.find((a) => {
      return a.name === sectionName;
    });
    setSectionTotal(a);
  };

  useFocusEffect(
    React.useCallback(() => {
      let mounted = true;
      mounted && calculateTotal();
      return () => {
        mounted = false;
      };
    }, [])
  );

  const percentage = () => {
    return Math.round((sectionTotal.amount / sectionTotal.total) * 100);
  };

  return (
    <Section>
      <Bar navigation={navigation} title={sectionName} />
      <UnderView income={income}>
        <OccupancyView>
          <LeftView>
            <LeftViewTitle>Details</LeftViewTitle>
            <Svg
              style={{
                transform: [{ rotate: '-90deg' }],
              }}
            >
              <Circle
                cx='50%'
                cy='50%'
                r='80'
                fill='none'
                stroke={Colors.mainColorAlmostInvisible}
                strokeWidth={13}
              ></Circle>
              <Circle
                cx='50%'
                cy='50%'
                r='80'
                fill='none'
                strokeWidth={13}
                stroke={Colors.tabIconSelected}
                strokeLinecap='round'
                strokeDasharray={502}
                strokeDashoffset={502 - (502 * percentage()) / 100}
              ></Circle>
            </Svg>
            <CircleInfo>
              <Percentage>{percentage()}</Percentage>
              <PSpan>%</PSpan>
              <SubText>of total expenses</SubText>
            </CircleInfo>
          </LeftView>
          <RightView>
            <TinyCluster>
              <Description>Per Week</Description>
              <Amount>
                {curr}{' '}
                {parseFloat(sectionTotal.amount / 52.1428228589286).toFixed(2)}
              </Amount>
            </TinyCluster>
            <TinyCluster>
              <Description>Per Month</Description>
              <Amount>
                {curr} {parseFloat(sectionTotal.amount / 26.0714).toFixed(2)}
              </Amount>
            </TinyCluster>
            <TinyCluster>
              <Description>Per Anum</Description>
              <Amount>
                {curr} {parseFloat(sectionTotal.amount).toFixed(2)}
              </Amount>
            </TinyCluster>
          </RightView>
        </OccupancyView>
        {income ? (
          <UnderViewText>
            {sectionName} consumes{' '}
            {Math.floor((sectionTotal.amount / income) * 100)}% of your income.
          </UnderViewText>
        ) : null}
      </UnderView>
    </Section>
  );
};

const Section = styled.SafeAreaView`
  background: ${Colors.appBg};
  flex: 1;
`;

const UnderView = styled.View`
  background: ${Colors.mainColorAlmostInvisible};
  margin: 10px;
  height: ${({ income }) => (income ? 300 : 250)}px;
  border-radius: 20px;
`;

const UnderViewText = styled.Text`
  margin: auto;
  font-size: 16px;
  color: ${Colors.sectionTitle};
`;

const OccupancyView = styled.View`
  height: 250px;
  flex-direction: row;
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 5px rgba(0, 0, 0, 0.1);
`;

const LeftView = styled.View`
  flex: 3;
  align-items: center;
  padding: 15px 0;
`;

const CircleInfo = styled.View`
  position: absolute;
  top: 48%;
  width: 50%;
  align-items: center;
`;

const Percentage = styled.Text`
  font-size: 45px;
  font-weight: 300;
  color: ${Colors.tabIconSelectedFaded};
`;

const PSpan = styled.Text`
  position: absolute;
  top: 8px;
  right: 8px;
  font-size: 18px;
  color: ${Colors.tabIconSelectedFaded};
`;

const SubText = styled.Text`
  position: absolute;
  left: 5px;
  bottom: -15px;
  color: ${Colors.titleFaded};
`;

const RightView = styled.View`
  flex: 2;
  justify-content: space-evenly;
`;

const TinyCluster = styled.View`
  flex-direction: column;
`;

const Description = styled.Text`
  color: ${Colors.sectionTitle};
`;

const Amount = styled.Text`
  font-size: 18px;
  font-weight: 500;
  color: ${Colors.tabIconSelected};
`;

const LeftViewTitle = styled.Text`
  font-weight: 600;
  font-size: 17px;
  color: ${Colors.sectionTitle};
`;

export default ClusterStack;
