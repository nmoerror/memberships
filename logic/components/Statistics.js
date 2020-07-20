import React, { useState } from 'react';
import styled from 'styled-components';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../constants/Colors';

const Statistics = ({ memberships, curr }) => {
  const [total, setTotal] = useState(0);

  useFocusEffect(
    React.useCallback(() => {
      let total = 0;
      memberships.forEach((item) => (total += parseFloat(item.amount)));
      setTotal(total);
    }, [])
  );

  const calculatePercentage = (amount) => {
    return Math.round((parseFloat(amount) / total) * 100);
  };

  return (
    <Section>
      {memberships
        .sort((a, b) => b.amount - a.amount)
        .map((membership) => {
          return (
            <Item key={membership.id}>
              <RowView>
                <Name>{membership.name}</Name>
                <Type>{membership.type}</Type>
              </RowView>
              <Division />
              <RowAmount>
                <Amount>
                  {curr}
                  {parseFloat(membership.amount)
                    .toFixed(2)
                    .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
                </Amount>
                <FadedBrackets>
                  (
                  <PercentageOfTotal
                    color={
                      calculatePercentage(membership.amount) <= 49
                        ? 'green'
                        : 'red'
                    }
                  >
                    {calculatePercentage(membership.amount)}%
                  </PercentageOfTotal>
                  )
                </FadedBrackets>
              </RowAmount>
            </Item>
          );
        })}
    </Section>
  );
};

const Section = styled.View`
  margin-top: 10px;
  margin-bottom: 40px;
`;
const Item = styled.View`
  background: white;
  min-height: 90px;
  border-radius: 10px;
  padding: 10px 15px;
  margin: 5px 0 10px 0;
  box-shadow: 0 4px 3px rgba(0, 0, 0, 0.08);
`;

const RowView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const Name = styled.Text`
  font-size: 18px;
`;

const Division = styled.View`
  height: 1px;
  background: rgba(0, 0, 0, 0.1);
  margin: 12px 0;
`;

const Type = styled.Text`
  color: ${Colors.titleFaded};
`;

const Amount = styled.Text`
  font-size: 20px;
  font-weight: 600;
  margin-left: 3px;
`;

const RowAmount = styled.View`
  flex-direction: row;
  align-items: center;
`;

const FadedBrackets = styled.Text`
  color: rgba(0, 0, 0, 0.8);
  margin: auto 5px auto auto;
  font-size: 18px;
  opacity: 0.8;
`;

const PercentageOfTotal = styled.Text`
  color: ${({ color }) => color};
  font-weight: 600;
  font-size: 16px;
`;

export default Statistics;
