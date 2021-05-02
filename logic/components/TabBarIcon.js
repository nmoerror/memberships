import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import Colors from '../constants/Colors';

export default function TabBarIcon({ name, focused, size }) {
  let color = focused ? Colors.tabIconSelected : Colors.tabIconDefault;

  return <Ionicons name={name} size={size} color={color} style={{
    display: 'block',
  }}
  />;
}

TabBarIcon.defaultProps = {
  size: 10
}
