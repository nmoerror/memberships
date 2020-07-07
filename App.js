import React from 'react';
import { SplashScreen } from 'expo';
import { StyleSheet, Text, View, StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './navigation/BottomTabNavigation';
import useLinking from './navigation/Linking';
import AddModal from './logic/modals/AddModal';
import EditModal from './logic/modals/EditModal';
import SettingsModal from './logic/modals/SettingsModal';

const App = ({ skipLoadingScreen }) => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  const [initialNavigationState, setInitialNavigationState] = React.useState();
  const containerRef = React.useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load resources prior app start
  React.useEffect(() => {
    StatusBar.setBarStyle('dark-content');

    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();
        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }
    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !skipLoadingScreen) {
    return null;
  }

  const MainStack = createStackNavigator();
  const ModalStack = createStackNavigator();

  const ModalStacks = () => {
    return (
      <ModalStack.Navigator mode='modal'>
        <MainStack.Screen
          options={{
            headerShown: false,
          }}
          name='Root'
          component={BottomTabNavigator}
        />
        <ModalStack.Screen
          options={{
            headerShown: false,
          }}
          name='Add'
          component={AddModal}
        />
        <ModalStack.Screen
          options={{
            headerShown: false,
          }}
          name='Edit'
          component={EditModal}
        />
        <ModalStack.Screen
          options={{
            headerShown: false,
          }}
          name='Settings'
          component={SettingsModal}
        />
      </ModalStack.Navigator>
    );
  };

  return (
    <View style={styles.container}>
      <NavigationContainer
        theme={{
          colors: {
            primary: 'rgba(127,51,229,1)',
            background: 'rgb(255, 253, 253)',
            card: 'rgb(255, 255, 255)',
            text: 'rgba(40,40,40,1)',
            border: 'white',
          },
        }}
        ref={containerRef}
        initialState={initialNavigationState}
      >
        <ModalStacks />
      </NavigationContainer>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
