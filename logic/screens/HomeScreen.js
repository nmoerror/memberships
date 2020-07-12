import React, { Fragment, useEffect, useState } from 'react';
import {
  View,
  Text,
  SafeAreaView,
  RefreshControl,
  Dimensions,
  useColorScheme,
  Settings,
  ActionSheetIOS,
  Platform,
} from 'react-native';
import styled from 'styled-components';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../constants/Colors';
import { Currency } from '../constants/Options';
import i18n from 'i18n-js';

// Async Storage
import {
  getItemAsync,
  setItemAsync,
  deleteItemAsync,
} from '../utils/secureStorage';

const wh = Dimensions.get('window').height;

const HomeScreen = ({ route, navigation }) => {
  const [memberships, setMemberships] = useState([]);
  const [clusters, setClusters] = useState([]);
  const [me, setMe] = useState(Settings.get('name'));

  const createClusters = (parsedMembers) => {
    let clus = [];
    parsedMembers.forEach((element) => {
      clus.push(element.type);
    });
    setClusters([...new Set(clus)].sort());
  };
  const reset = async () => {
    try {
      let val = await getItemAsync('memberships');
      if (val) {
        let parsedMembers = JSON.parse(val);
        setMemberships(parsedMembers);
        createClusters(parsedMembers);
      }
    } catch (err) {}
  };
  useFocusEffect(
    React.useCallback(() => {
      (async () => {
        try {
          setMe(Settings.get('name'));
          let val = await getItemAsync('memberships');
          if (val) {
            let parsedMembers = JSON.parse(val);
            setMemberships(parsedMembers);
            createClusters(parsedMembers);
          }
        } catch (err) {}
      })();
    }, [route])
  );

  const Greet = () => {
    let time = new Date().getHours();
    if (time < 12) {
      return me ? `${i18n.t('Good Morning')}${me}` : i18n.t('Overview');
    } else if (time < 18) {
      return me ? `${i18n.t('Good Afternoon')}${me}` : i18n.t('Overview');
    } else {
      return me ? `${i18n.t('Good Evening')}${me}` : i18n.t('Overview');
    }
  };

  return (
    <Section>
      <Bar mar={me ? 18 : 5}>
        <Title
          style={{ color: Colors.title }}
          mar={me ? 'auto auto auto 20px' : 'auto'}
        >
          <Greet />
        </Title>
        {memberships.length && me ? (
          <SubIntro>{i18n.t('statistics for you')}</SubIntro>
        ) : null}
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
          paddingRight: 20,
          paddingLeft: 20,
          marginTop: -5,
        }}
      >
        {memberships.length ? (
          <Items>
            {clusters.map((cluster) => (
              <Cluster key={cluster}>
                <ClusterTitle>{i18n.t(cluster)}</ClusterTitle>
                <Division />
                {memberships.map((item) => {
                  if (item.type === cluster) {
                    return (
                      <Fragment key={item.id}>
                        <Item
                          onLongPress={() =>
                            Platform.OS === 'ios' &&
                            ActionSheetIOS.showActionSheetWithOptions(
                              {
                                options: [
                                  i18n.t('Cancel'),
                                  i18n.t('Edit'),
                                  i18n.t('Delete'),
                                ],
                                destructiveButtonIndex: 2,
                                cancelButtonIndex: 0,
                              },
                              (buttonIndex) => {
                                if (buttonIndex === 0) {
                                  // cancel action
                                } else if (buttonIndex === 1) {
                                  navigation.push('Edit', {
                                    item,
                                    memberships,
                                  });
                                } else if (buttonIndex === 2) {
                                  (async () => {
                                    try {
                                      let newMemberships = memberships.filter(
                                        (element) => element.id !== item.id
                                      );
                                      await setItemAsync(
                                        'memberships',
                                        JSON.stringify(newMemberships)
                                      );
                                      reset();
                                    } catch (err) {}
                                  })();
                                }
                              }
                            )
                          }
                          onPress={() =>
                            navigation.push('Edit', { item, memberships })
                          }
                        >
                          <View>
                            <ItemName>{item.name}</ItemName>
                            <ItemType>{i18n.t(`${item.type}`)}</ItemType>
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
                                    parseFloat(item.amount)
                                      .toFixed(2)
                                      .indexOf('.')
                                  )
                                  .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') +
                                  '.'}
                              </AmountText>
                              <SecondaryText>
                                {
                                  parseFloat(item.amount)
                                    .toFixed(2)
                                    .split('.')[1]
                                }
                              </SecondaryText>
                            </Row>
                            <ItemInterval>
                              {i18n.t(`${item.paymentInterval}`)}
                            </ItemInterval>
                          </More>
                        </Item>
                      </Fragment>
                    );
                  }
                })}
              </Cluster>
            ))}
          </Items>
        ) : (
          <EmptyView>
            <SecondaryAddText>
              {i18n.t('I am your new best expense tracker !')}
            </SecondaryAddText>
            <AddText>{i18n.t('Click the icon to start tracking')}</AddText>
          </EmptyView>
        )}
      </ScrollView>
    </Section>
  );
};

const Section = styled.SafeAreaView``;

const Bar = styled.View`
  height: 50px;
  margin-bottom: ${(props) => props.mar}px;
`;

const Title = styled.Text`
  margin: ${(props) => props.mar};
  font-size: 20px;
  font-weight: 500;
`;

const SubIntro = styled.Text`
  position: absolute;
  bottom: -1px;
  left: 20px;
  color: ${Colors.titleFaded};
  font-size: 16px;
`;

const AddItem = styled.TouchableOpacity`
  position: absolute;
  right: 8px;
  top: 5px;
  width: 40px;
  align-items: center;
`;

const Items = styled.View``;

const Cluster = styled.View``;

const ClusterTitle = styled.Text`
  font-size: 18px;
  margin-top: 10px;
  font-weight: 600;
  color: ${Colors.sectionTitle};
`;

const Item = styled.TouchableOpacity`
  height: 62px;
  padding: 10px 5px;
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
  background: ${Colors.tabIconSelectedFaded}
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

const EmptyView = styled.View`
  align-items: center;
  margin: 50% auto;
`;

const AddText = styled.Text`
  font-size: 18px;
  margin-top: 20px;
`;

const SecondaryAddText = styled.Text`
  color: ${Colors.titleFaded};
  font-size: 18px;
`;

export default HomeScreen;
