import * as React from 'react';
import {
  TouchableOpacity,
  SafeAreaView,
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import styled from 'styled-components';

//import Colors from '../constants/Colors';
import { StatusBar, Keyboard } from 'react-native';

// Sub Views
import Login from './LoginScreen';
import Signup from './SignupScreen';

const AuthScreen = ({ setLoading, loading }) => {
  const [toggle, setToggle] = React.useState(false);

  React.useEffect(() => {
    StatusBar.setBarStyle('dark-content');
  }, []);

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <SafeAreaView style={{ height: '100%' }}>
        <OverView>
         <BrandText>OVERVIEW</BrandText>
        </OverView>
        { toggle ? (
          <Signup setToggle={setToggle}  />
        ) : (
          <Login setToggle={setToggle}  />
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const OverView = styled.View ` 
  padding: 20px 0;
  margin-top: 10%;
`

const BrandText = styled.Text`
  font-size: 25px;
  font-weight: 700;
  text-align: center;
`;


export default AuthScreen;
