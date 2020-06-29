import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../logic/components/TabBarIcon';
import * as React from 'react';

import HomeScreen from '../logic/screens/HomeScreen';
import StatisticsScreen from '../logic/screens/StatisticsScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Home';

export default function BottomTabNavigator({ navigation, route }) {
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: 'Memberships',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-list' />
          ),
        }}
      />
      <BottomTab.Screen
        name='Statistics'
        component={StatisticsScreen}
        options={{
          title: 'Totals',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='ios-stats' />
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
      return 'Memberships';
    case 'Statistics':
      return 'Totals';
  }
}
