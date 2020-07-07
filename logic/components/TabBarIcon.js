import { Ionicons } from '@expo/vector-icons';
import * as React from 'react';
import Colors from '../constants/Colors';
import styled from 'styled-components';

export default function TabBarIcon({ name, focused, secondary }) {
  let color = focused ? Colors.tabIconSelected : Colors.tabIconDefault;

  return <Ionicons name={name} size={35} color={color} />;
}
