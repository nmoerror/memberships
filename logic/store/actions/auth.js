import axios from "axios";
import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	LOGOUT,
	LOADING,
} from "./types";

import setAuthToken from "../../utils/setAuthToken";

//import { setAlert } from './alert';

// Load User
export const loadUser = () => async (dispatch) => {
	//if (AsyncStorage.getItem('token')) {
	//setAuthToken(AsyncStorage.getItem('token'));
	//}
	try {
		const res = await axios.get("/api/v1/auth/me");

		dispatch({
			type: USER_LOADED,
			payload: res.data,
		});
		// MUST GET PROFILE HERE
	} catch (err) {
		console.log(err);
		dispatch({
			type: AUTH_ERROR,
		});
	}
};

// Register User
export const register = ({ name, surname, email, password }) => async (
	dispatch
) => {
	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	const body = JSON.stringify({ name, surname, email, password });

	try {
		const res = await axios.post(
			"http://172.20.10.6:5366/api/v1/auth/register",
			body,
			config
		);

		dispatch({
			type: REGISTER_SUCCESS,
			payload: res.data,
		});
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => "");
		}

		dispatch({
			type: REGISTER_FAIL,
		});
	}
};

// Login User
export const login = (email, password) => async (dispatch) => {
	dispatch(setLoading());

	const config = {
		headers: {
			"Content-Type": "application/json",
		},
	};

	email = email.toLowerCase();
	const body = JSON.stringify({ email, password });

	try {
		const res = await axios.post(
			`http://172.20.10.6:5366/api/v1/auth/login`,
			body,
			config
		);

		dispatch({
			type: LOGIN_SUCCESS,
			payload: res.data,
		});

		// Load the user
	} catch (err) {
    console.log(err.response.data);
		//dispatch(setAlert(err.message));
		dispatch({
			type: LOGIN_FAIL,
		});
	}
};

// Logout / Clear Profile
export const logout = () => async (dispatch) => {
	setAuthToken(null);
	dispatch({ type: LOGOUT });
};

// Set Loading
export const setLoading = () => async (dispatch) => {
	dispatch({ type: LOADING });
};
