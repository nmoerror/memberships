import React, { useState } from "react";
import { Text, View } from "react-native";
import styled from "styled-components";
import Colors from "../../constants/Colors";
import { login } from "../../store/actions/auth";
import { RE_ATTEMPT } from "../../store/actions/types";

import { useSelector, useDispatch } from "react-redux";

const LoginScreen = ({ setToggle }) => {
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: ''
  });
  const auth = useSelector(state => state.auth);

	const dispatch = useDispatch();

  const attemptToLogin = () => { 
    if(!loginForm.email.length || !loginForm.password.length) {
      return;
    }

    dispatch(login(loginForm.email, loginForm.password));
  }

  const handleChange = (value, name) => {
    if(auth.authFailed) {
      dispatch({
        type: RE_ATTEMPT
      });
    }

    setLoginForm({...loginForm, [name]: value});
  }

	return (
		<SignInForm behavior="padding">
			<View style={{ margin: "auto" }}>
				<Input
					placeholder="Email"
					value={loginForm.email}
					onChangeText={(e) => handleChange(e, 'email')}
					textContentType="username"
          error={auth.authFailed}
				/>
				<Input
					placeholder="Password"
					value={loginForm.password}
					onChangeText={(e) => handleChange(e, 'password')}
					textContentType="password"
          error={auth.authFailed}
				/>
			</View>
			<ForgotPassword>
				<ForgotPasswordText>Forgot Password?</ForgotPasswordText>
			</ForgotPassword>
			<GetStarted
				style={{ marginTop: 5 }}
				onPress={() => attemptToLogin()}
        disabled={auth.loading}
			>
				<GetStartedText>{auth.loading ? 'Logging in..' : 'Log in' }</GetStartedText>
			</GetStarted>
			<Toggle onPress={() => setToggle(true)}>
				<Text style={{ color: Colors.tabIconSelected }}>
					I don't have an account
				</Text>
			</Toggle>
		</SignInForm>
	);
};

const SignInForm = styled.KeyboardAvoidingView`
	width: 90%;
	margin: 5px auto auto;
`;

const Toggle = styled.TouchableOpacity`
	align-self: center;
	align-items: center;
	border-radius: 7px;
	padding: 10px;
	width: 90%;
	margin-bottom: 40px;
`;

const Input = styled.TextInput`
  position: relative;
	padding: 15px;
	width: 100%;
	border-radius: 7px;
	margin: auto auto 15px auto;
	background: rgba(210, 210, 210, 0.1);
	border: ${props => props.error ? '1px solid red' : '1px solid rgba(210, 210, 210, 0.3)'};
	font-size: 16px;
  overflow: visible;
`;

const ForgotPassword = styled.TouchableOpacity`
	margin: 0 0 10px auto;
`;

const ForgotPasswordText = styled.Text`
	text-align: right;
	color: ${Colors.tabIconSelected};
	font-weight: 500;
	font-size: 12px;
	padding: 2px;
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
