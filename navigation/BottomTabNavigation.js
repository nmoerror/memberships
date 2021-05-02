import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import TabBarIcon from '../logic/components/TabBarIcon';
import * as React from 'react';
import HomeScreen from '../logic/screens/HomeScreen';
import StatisticsScreen from '../logic/screens/StatisticsScreen';
import MenuScreen from '../logic/screens/MenuScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Statistics';

export default function BottomTabNavigator() {
  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
      <BottomTab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          title: 'Expenses',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='md-list' size={35}/>
          ),
        }}
      />
      <BottomTab.Screen
        name='Statistics'
        component={StatisticsScreen}
        options={{
          title: 'Totals',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='receipt' size={30}/>
          ),
        }}
      />
      <BottomTab.Screen
        name='Menu'
        component={MenuScreen}
        options={{
          title: 'Menu',
          tabBarIcon: ({ focused }) => (
            <TabBarIcon focused={focused} name='ios-menu' size={40}/>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
