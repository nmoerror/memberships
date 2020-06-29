import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, RefreshControl } from 'react-native';
import styled from 'styled-components';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';

// Async Storage
import {
  getItemAsync,
  setItemAsync,
  deleteItemAsync,
} from '../utils/secureStorage';

const HomeScreen = ({ navigation }) => {
  const [memberships, setMemberships] = useState([]);

  useEffect(() => {
    const lala = async () => {
      try {
        let val = await getItemAsync('memberships');
        if (val) {
          setMemberships(JSON.parse(val));
        }
      } catch (err) {
        console.log(err);
      }
    };

    lala();
  });

  return (
    <Section>
      <Bar>
        <Title>Memberships</Title>
        <AddItem
          onPress={() =>
            navigation.push('Add', {
              memberships,
            })
          }
        >
          <Ionicons name='ios-add' size={40} />
        </AddItem>
      </Bar>
      <ScrollView style={{ height: '100%' }}>
        {memberships.length ? (
          <Items>
            {memberships.map((item) => {
              return (
                <Fragment key={item.id}>
                  <Division />
                  <Item onPress={() => deleteItemAsync('memberships')}>
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
        ) : (
          <Text>Add a membership to get started!</Text>
        )}
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

/*   onPress={() =>
                      navigation.push('Edit', {
                        item,
                      })*/

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
