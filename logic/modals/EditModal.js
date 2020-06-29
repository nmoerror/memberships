import React from 'react';
import { View, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const EditModal = ({ route, navigation }) => {
  const { item } = route.params;

  return (
    <SafeAreaView>
      <Text>edit {item.id}</Text>
    </SafeAreaView>
  );
};

export default EditModal;
