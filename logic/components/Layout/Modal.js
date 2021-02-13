import * as React from "react";
import Colors from "../../constants/Colors";
import styled from "styled-components";
import { removeModal } from "../../store/actions/modal";
import { Ionicons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { Animated, Dimensions } from "react-native";

const sw = Dimensions.get("window").width;
const sh = Dimensions.get("window").height;

const Modal = () => {
	const width = React.useRef(new Animated.Value(sw * 0.8)).current;
	const height = React.useRef(new Animated.Value(sh * 0.5)).current;
	const modal = useSelector((state) => state.modal);
	const dispatch = useDispatch();

	React.useEffect(() => {
		Animated.spring(width, {
			toValue: modal.length ? sw * 0.9 : sw * 0.8,
			duration: 10000,
			useNativeDriver: false,
		}).start();

		Animated.spring(height, {
			toValue: modal.length ? sh * 0.6 : sh * 0.5,
			duration: 10000,
			useNativeDriver: false,
		}).start();
	}, [modal]);

	if (!modal) {
		return null;
	}

	return (
		<View key={modal.id}>
			<AnimatedContainer style={{ width: width, height: height }}>
				<CloseButton onPress={() => dispatch(removeModal())}>
					<Ionicons name="md-close" size={30} mr="auto" ml="auto" />
				</CloseButton>
				<ImageFrame>
					<Image source="" />
					<MagicDate>23</MagicDate>
				</ImageFrame>
				<Text>Alejandro, You've scheduled a new Appointment on:</Text>
				<TextBig>Wednesday 23 July at 10:00</TextBig>
				<SecondaryText>
					All reminders are on. I will notify you to make sure you don't miss
					your appoinment.
				</SecondaryText>
				<MainButton onPress={() => dispatch(removeModal())}>
					<ButtonText>OK</ButtonText>
				</MainButton>
			</AnimatedContainer>
		</View>
	);
};

const View = styled.View`
	position: absolute;
	width: ${sw};
	height: ${sh};
`;

const ModalSection = styled.View`
	background: white;
	margin: auto;
	border-radius: 8px;
	align-items: center;
	box-shadow: 0 6px 8px rgba(0, 0, 0, 0.2);
	padding: 30px 0;
`;
const AnimatedContainer = Animated.createAnimatedComponent(ModalSection);

const MainButton = styled.TouchableOpacity`
	width: 60%;
	padding: 14px;

	margin: auto auto 15px auto;
	border-radius: 8px;
	align-items: center;
	box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
`;

const Text = styled.Text`
	text-align: center;
	margin-bottom: 25px;
	max-width: 200px;
`;

const TextBig = styled.Text`
	font-size: 22px;
	font-weight: 600;
	color: rgba(0, 0, 0, 0.9);
`;

const ImageFrame = styled.View`
	width: 130px;
	height: 130px;

	padding: 20px;
	border-radius: 100px;
	margin: 50px auto 30px auto;
`;

const Image = styled.Image`
	width: 80%;
	height: 80%;
	padding: 30px;
	margin: auto;
`;

const ButtonText = styled.Text`
	color: white;
	font-weight: 700;
`;

const CloseButton = styled.TouchableOpacity`
	position: absolute;
	right: 20px;
	top: 15px;
`;

const MagicDate = styled.Text`
	position: absolute;
	top: 66%;
	left: 55%;
	font-size: 24px;

	font-weight: 800;
	margin: auto;
`;

const SecondaryText = styled.Text`
	text-align: center;
	margin-top: 20px;

	max-width: 300px;
`;

export default Modal;
