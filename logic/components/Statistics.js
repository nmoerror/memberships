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
      {memberships.map((membership) => (
        <>
          <Text>{membership.name}</Text>
          <Text>{membership.type}</Text>
          <Text>{membership.paymentInterval}</Text>
          <Text>{membership.amount}</Text>
        </>
      ))}
    </Section>
  );
};

const Section = styled.View`
  margin-top: 10px;
`;

export default Statistics;
