import React from 'react';
import { SplashScreen } from 'expo';
import { StyleSheet, View, StatusBar, I18nManager } from 'react-native';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import translate from './logic/translations/languages';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavigator from './navigation/BottomTabNavigation';

import AddModal from './logic/modals/AddModal';
import EditModal from './logic/modals/EditModal';
import AboutStack from './logic/screens/Stacks/AboutStack';
import MeStack from './logic/screens/Stacks/MeStack';
import PreferencesStack from './logic/screens/Stacks/PreferencesStack';
import SettingsStack from './logic/screens/Stacks/SettingsStack';
import moment from 'moment/min/moment-with-locales';

const App = ({ skipLoadingScreen }) => {
  const [isLoadingComplete, setLoadingComplete] = React.useState(false);

  // Load resources prior app start
  React.useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    // Set the locale once at the beginning of your app.
    i18n.locale = Localization.locale;
    moment.locale(i18n.locale);
    // When a value is missing from a language it'll fallback to another language with the key present.
    i18n.fallbacks = true;
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();
        // Load our initial navigation state
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
  const SideStack = createStackNavigator();

  const MainStackScreen = () => {
    return (
      <SideStack.Navigator>
        <MainStack.Screen
          options={{
            headerShown: false,
          }}
          name='Main'
          component={BottomTabNavigator}
        />
        <SideStack.Screen
          options={{
            headerShown: false,
          }}
          name='About'
          component={AboutStack}
        />
        <SideStack.Screen
          options={{
            headerShown: false,
          }}
          name='Me'
          component={MeStack}
        />
        <SideStack.Screen
          options={{
            headerShown: false,
          }}
          name='Preferences'
          component={PreferencesStack}
        />
        <SideStack.Screen
          options={{
            headerShown: false,
          }}
          name='Settings'
          component={SettingsStack}
        />
      </SideStack.Navigator>
    );
  };

  const ModalStacks = () => {
    return (
      <ModalStack.Navigator mode='modal'>
        <ModalStack.Screen
          name='Root'
          component={MainStackScreen}
          options={{ headerShown: false }}
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
