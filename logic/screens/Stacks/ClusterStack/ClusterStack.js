import React from 'react';
import { View, Text, Dimensions, Settings } from 'react-native';
import styled from 'styled-components';

const ClusterStack = ({ route }) => {
  const { sectionName } = route.params;

  return (
    <ThisSection>
      <Text>{sectionName}</Text>
    </ThisSection>
  );
};

const ThisSection = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export default ClusterStack;
