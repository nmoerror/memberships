import * as React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';
import Colors from '../../constants/Colors';
import { login } from '../../store/actions/auth';

import { useSelector, useDispatch } from "react-redux";

const LoginScreen = ({ setToggle}) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  
  const dispatch = useDispatch();

  return (
    <SignInForm behavior='padding'>
      	<View style={{ margin: 'auto' }}>
      <Input        
        name="email"
        placeholder='Email'
        value={email}
        onChangeText={(e) => setEmail(e)}
      ></Input>
      <Input
        name="password"
        placeholder='Password'
        value={password}
        onChangeText={(e) => setPassword(e)}
      ></Input>
      </View>
      <ForgotPassword><ForgotPasswordText>Forgot Password?</ForgotPasswordText></ForgotPassword>
      <GetStarted
        style={{ marginTop: 5 }}
        onPress={() => dispatch(login(email, password))}
      >
        <GetStartedText>Log in</GetStartedText>
      </GetStarted>
      <Toggle onPress={() => setToggle(true)}>
        <Text
          style={{ color: Colors.tabIconSelected }}
        >I don't have an account</Text>
      </Toggle>
    </SignInForm>
  );
};

const Toggle = styled.TouchableOpacity`
  align-self: center;
  align-items: center;
  border-radius: 7px;
  padding: 10px;
  width: 90%;
  margin-bottom: 40px;
`;

const Input = styled.TextInput`
  padding: 15px;
  width: 100%;
  border-radius: 7px;
  margin: auto auto 15px auto;
  background: rgba(210, 210, 210, 0.1);
  border: 1px solid rgba(210, 210, 210, 0.3);
  font-size: 16px;
`;

const ForgotPassword = styled.TouchableOpacity `
  margin: 0 0 10px auto;
`

const ForgotPasswordText = styled.Text `
  text-align: right;
  color: ${Colors.tabIconSelected};
  font-weight: 500;
  font-size: 12px;
  padding: 2px;
`

const SignInForm = styled.KeyboardAvoidingView`
  width: 90%;
  margin: 20% auto auto;
`;

const GetStarted = styled.TouchableOpacity`
  padding: 10px;
  background: ${Colors.tabIconSelectedFaded};
  width: 100%;
  border-radius: 7px;
  border: none;
  margin: auto auto 20px auto;
`;

const GetStartedText = styled.Text`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  color: white;
  padding: 3px;
`;

export default LoginScreen;
