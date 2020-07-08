import React, { useEffect, useState } from 'react';
import { View, Text, Animated } from 'react-native';
import styled from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';

const Statistics = ({ route, memberships, interval }) => {
  const [stats, setStats] = useState([]);

  useFocusEffect(
    React.useCallback(() => {
      (async () => {})();
    }, [route])
  );

  return (
    <Section>
      <MainStats></MainStats>
      {memberships.map((membership) => (
        <Item>
          <Text>{membership.name}</Text>
          <Text>{membership.type}</Text>
          <Text>{membership.paymentInterval}</Text>
          <Text>{membership.amount}</Text>
        </Item>
      ))}
    </Section>
  );
};

const Section = styled.View`
  margin-top: 10px;
`;

const MainStats = styled.View`
  background: white;
  height: 300px;
  border-radius: 10px;
  padding: 10px 4px;
  margin: 5px 0 10px 0;
`;

const Item = styled.View`
  background: white;
  border-radius: 10px;
  padding: 10px 4px;
  margin: 5px 0 10px 0;
  box-shadow: 0 4px 3px rgba(0, 0, 0, 0.08);
`;

export default Statistics;
