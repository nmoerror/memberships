import React, { useState } from "react";
import styled from "styled-components";
import { Ionicons } from "@expo/vector-icons";
import Colors from "../../constants/Colors";
import { logout } from "../../store/actions/auth";
import { Alert } from "react-native";

import { useSelector, useDispatch } from "react-redux";

const AccountStack = ({ route, navigation }) => {
	const [notifyOnDueDate, setNotifyOnDueDate] = useState(false);
	const user = useSelector((state) => state.auth.user?.name);
	const dispatch = useDispatch();

	const createTwoButtonAlert = () =>
		Alert.alert(`Log out`, `Is this a goodbye, ${user}? 😭`, [
			{
				text: "Just kidding! 🙂",
			},
			{
				text: "Yes, Logout 👋",
				style: "cancel",
				onPress: () => dispatch(logout()),
			},
		]);

	const forgotPasswordPrompt = () =>
		Alert.alert(`Log out`, `Is this a goodbye, ${user}? 😭`, [
			{
				text: "Just kidding! 🙂",
			},
			{
				text: "Yes, Logout 👋",
				style: "cancel",
				onPress: () => dispatch(logout()),
			},
		]);

	return (
		<Section>
			<Bar>
				<CancelItem onPress={() => navigation.goBack()}>
					<Ionicons name="ios-arrow-back" size={30} color={Colors.icons} />
				</CancelItem>
				<Title style={{ color: Colors.title }}>Settings</Title>
			</Bar>
			<Main>
				<MenuItem onPress={() => createTwoButtonAlert()}>
					<ItemName>Logout</ItemName>
					<Go>
						<Ionicons name="log-out" size={20} color={Colors.icons} />
					</Go>
				</MenuItem>
			</Main>
			<Main>
				<MenuItem onPress={() => createTwoButtonAlert()}>
					<ItemName>Logout</ItemName>
					<Go>
						<Ionicons name="log-out" size={20} color={Colors.icons} />
					</Go>
				</MenuItem>
			</Main>
		</Section>
	);
};

const Section = styled.SafeAreaView`
	padding: 0 10px;
`;

const Switch = styled.Switch``;

const Bar = styled.View`
	height: 50px;
`;

const CancelItem = styled.TouchableOpacity`
	position: absolute;
	left: 8px;
	top: 12px;
	width: 40px;
	align-items: center;
`;

const Title = styled.Text`
	margin: auto;
	font-size: 20px;
`;

const Main = styled.View`
	padding: 10px 20px;
	height: 80%;
`;

const SectionTitle = styled.Text`
	font-size: 20px;
	margin: 5px 0 10px;
	color: ${Colors.icons};
	font-weight: bold;
	opacity: 0.8;
`;

const MenuItem = styled.TouchableOpacity`
	padding: 10px 0;
	flex-direction: row;
	align-items: center;
`;

const ItemName = styled.Text`
	margin-left: 5px;
`;

const Go = styled.View`
	margin: auto 0 auto auto;
	opacity: 0.7;
`;

export default AccountStack;
