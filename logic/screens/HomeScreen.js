import React, { Fragment, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  RefreshControl,
  Dimensions,
} from 'react-native';
import styled from 'styled-components';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../constants/Colors';

// Async Storage
import {
  getItemAsync,
  setItemAsync,
  deleteItemAsync,
} from '../utils/secureStorage';

const wh = Dimensions.get('window').height;

const HomeScreen = ({ route, navigation }) => {
  const [memberships, setMemberships] = useState([]);

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
        <Title style={{ color: Colors.title }}>My Memberships</Title>
        <AddItem
          onPress={() =>
            navigation.push('Add', {
              memberships,
            })
          }
        >
          <Ionicons name='ios-add' size={40} color={Colors.icons} />
        </AddItem>
      </Bar>
      <ScrollView
        style={{
          height: wh - 200,
          paddingRight: 10,
          paddingLeft: 10,
        }}
      >
        {memberships.length ? (
          <Items>
            {memberships.map((item) => {
              return (
                <Fragment key={item.id}>
                  <Division />
                  <Item
                    onPress={() =>
                      navigation.push('Edit', { item, memberships })
                    }
                  >
                    <View>
                      <ItemName>{item.name}</ItemName>
                      <ItemType>{item.type}</ItemType>
                    </View>
                    <More>
                      <Text
                        style={{ marginRight: 2, marginTop: 1, fontSize: 16 }}
                      >
                        $
                      </Text>
                      <AmountText>
                        {parseFloat(item.amount)
                          .toFixed()
                          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + '.'}
                      </AmountText>
                      <SecondaryText>
                        {parseFloat(item.amount).toFixed(2).split('.')[1]} /
                        {item.paymentInterval.charAt(0).toLowerCase()}
                      </SecondaryText>
                    </More>
                  </Item>
                </Fragment>
              );
            })}
          </Items>
        ) : (
          <EmptyView>
            <AddText>Add a membership to get started!</AddText>
            <SecondaryAddText>
              I am your new best expense tracker ! :)
            </SecondaryAddText>
          </EmptyView>
        )}
      </ScrollView>
    </Section>
  );
};

const Section = styled.SafeAreaView``;

const Bar = styled.View`
  height: 50px;
  margin-bottom: 8px;
`;

const Title = styled.Text`
  margin: auto;
  font-size: 20px;
`;

const AddItem = styled.TouchableOpacity`
  position: absolute;
  right: 8px;
  top: 5px;
  width: 40px;
  align-items: center;
`;

const Items = styled.View``;

const Item = styled.TouchableOpacity`
  height: 62px;
  padding: 10px 20px;
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

const Division = styled.View`
  height: 1px;
  width: 100%;
  background: rgba(40, 40, 40, 0.15);
`;

const More = styled.View`
  margin-right: 0px;
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

const EmptyView = styled.View`
  align-items: center;
  margin: 50% auto;
`;

const AddText = styled.Text`
  font-size: 18px;
`;

const SecondaryAddText = styled.Text`
  color: ${Colors.titleFaded};
  margin-top: 20px;
  font-size: 18px;
`;

export default HomeScreen;
