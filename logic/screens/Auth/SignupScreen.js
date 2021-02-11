import * as React from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';
import Colors from '../../constants/Colors';

import { register } from '../../store/actions/auth';

import { useSelector, useDispatch } from "react-redux";

const SignupScreen = ({setToggle }) => {
	const [name, setName] = React.useState('');
    const [surname, setSurname] = React.useState('');
	const [email, setEmail] = React.useState('');
	const [continues, setContinues] = React.useState(false);
	const [password, setPassword] = React.useState(false);
	const [confirmPassword, setConfirmPassword] = React.useState(false);

	const dispatch = useDispatch();

	const attemptToRegister = () => {
		if(password !== confirmPassword) {
			alert('Password do not match!');
			return;
		}

		dispatch(register({name, surname, email, password}));
	}

	return (
		<SignUpForm behavior='padding'>
			<View style={{ margin: 'auto' }}>
				{!continues ? (
				<>
					<Input
						placeholder='Name'
						value={name}
						onChangeText={(e) => setName(e)}
					/>
					<Input
						placeholder='Last Name'
						value={surname}
						onChangeText={(e) => setSurname(e)}
					/>
					<Input
						placeholder='Email'
						value={email}
						onChangeText={(e) => setEmail(e)}
					/>
				</>
				): (
				<>
					<Input
						placeholder='Password'
						value={password}
						onChangeText={(e) => setPassword(e)}
					/>
					<Input
						placeholder='Confirm Password'
						value={confirmPassword}
						onChangeText={(e) => setConfirmPassword(e)}
					/>
				</>					
				)}

			</View>

			<GetStarted
			  onPress={() => {continues ? attemptToRegister() : setContinues(true)}}
			>
				<GetStartedText>{continues ? 'Sign up' : 'Continue'}</GetStartedText>
			</GetStarted>

			{continues ? (
				<GoBack
					onPress={() => setContinues(false)}
				>
					<GoBackText>Go back</GoBackText>
				</GoBack>
			): (
				null
			)}
			
			<Toggle onPress={() => setToggle(false)}>
				<Text
                    style={{color: Colors.tabIconSelected}}
                >I already have an account</Text>
			</Toggle>
		</SignUpForm>
	);
};

const SignUpForm = styled.KeyboardAvoidingView`
	margin: 5px auto auto auto;
	width: 90%;
`;

const Toggle = styled.TouchableOpacity`
	align-self: center;
	align-items: center;
	border-radius: 7px;
	padding: 10px;
	width: 100%;
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

const GetStarted = styled.TouchableOpacity`
	padding: 10px;
	background: ${Colors.tabIconSelectedFaded};
	width: 100%;
	border-radius: 7px;
	border: none;
	margin: 5px auto 5px auto;
`;

const GetStartedText = styled.Text`
	font-size: 20px;
	font-weight: 600;
	text-align: center;
	color: white;
`;


const GoBack = styled(GetStarted)` 
	background: white;
	border: 1px solid ${Colors.tabIconSelectedFaded};
`;

const GoBackText = styled(GetStartedText)` 
	color: ${Colors.tabIconSelectedFaded};
	font-size: 16px;
`;


export default SignupScreen;
