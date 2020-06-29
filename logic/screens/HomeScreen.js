import React, { Fragment } from 'react';
import { View, Text, SafeAreaView, RefreshControl } from 'react-native';
import styled from 'styled-components';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

function wait(timeout) {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  });
}

const HomeScreen = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);

    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  return (
    <Section>
      <Bar>
        <Title>Memberships</Title>
        <AddItem onPress={() => navigation.push('Add')}>
          <Ionicons name='ios-add' size={40} />
        </AddItem>
      </Bar>
      <ScrollView
        style={{ height: '100%' }}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <Items>
          {arr.map((item) => {
            return (
              <Fragment key={item.id}>
                <Division />
                <Item
                  onPress={() =>
                    navigation.push('Edit', {
                      item,
                    })
                  }
                >
                  <ItemName>{item.name}</ItemName>
                  <More>
                    <Ionicons
                      name='ios-more'
                      size={25}
                      color='rgba(0,0,0,0.8)'
                    />
                  </More>
                </Item>
              </Fragment>
            );
          })}
        </Items>
      </ScrollView>
    </Section>
  );
};

let arr = [
  {
    id: '1234543',
    name: 'Youtubre',
    link: '329893421u',
  },
  {
    id: '1212334543',
    name: 'Spority',
    link: '329893421u',
  },
  {
    id: '123454dsad3',
    name: 'AnytieFitness',
    link: '329893421u',
  },
  {
    id: '123qee4543',
    name: 'Soccer Premium',
    link: '329893421u',
  },
];

const Section = styled.SafeAreaView``;

const Bar = styled.View`
  height: 50px;
`;

const Title = styled.Text`
  margin: auto;
  font-size: 20px;
`;

const AddItem = styled.TouchableOpacity`
  position: absolute;
  right: 18px;
  top: 5px;
`;

const Items = styled.View``;

const Item = styled.TouchableOpacity`
  height: 50px;
  padding: 10px 20px;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
`;

const ItemName = styled.Text``;

const Division = styled.View`
  height: 1px;
  width: 100%;
  background: #ccc;
`;

const More = styled.View`
  transform: rotate(90deg);
  margin-right: 0px;
`;

export default HomeScreen;
