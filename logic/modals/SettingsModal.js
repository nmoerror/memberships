import React, { Fragment, useEffect, useState } from 'react';
import { View, Text, SafeAreaView, RefreshControl } from 'react-native';
import styled from 'styled-components';
import { ScrollView } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import Colors from '../constants/Colors';

const SettingsModal = ({ route, navigation }) => {
  return (
    <View>
      <Text>Settings</Text>
    </View>
  );
};

export default SettingsModal;
