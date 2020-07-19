import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../logic/components/TabBarIcon';
import * as React from 'react';
import HomeScreen from '../logic/screens/HomeScreen';
import StatisticsScreen from '../logic/screens/StatisticsScreen';
import MenuScreen from '../logic/screens/MenuScreen';
import i18n from 'i18n-js';
const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Statistics';

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: i18n.t('Expenses'),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-list' />
          ),
        }}
      />
      <BottomTab.Screen
        name='Statistics'
        component={StatisticsScreen}
        options={{
          title: i18n.t('Totals'),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='ios-stats' />
          ),
        }}
      />
      <BottomTab.Screen
        name='Menu'
        component={MenuScreen}
        options={{
          title: i18n.t('Menu'),
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-menu' />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

function getHeaderTitle(route) {
  const routeName =
    route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Home':
      return 'My List';
    case 'Statistics':
      return 'Totals';
    default:
      return '';
  }
}
