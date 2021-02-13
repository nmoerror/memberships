import {
	REGISTER_SUCCESS,
	REGISTER_FAIL,
	USER_LOADED,
	AUTH_ERROR,
	LOGIN_SUCCESS,
	LOGIN_FAIL,
	RE_ATTEMPT,
	LOGOUT,
	LOADING,
} from "../actions/types";

// Async Storage
import {
	getItemAsync,
	setItemAsync,
	deleteItemAsync,
} from '../../utils/secureStorage';

const initialState = {
	//token: getItemAsync('token'),
	isAuthenticated: false,
	authFailed: false,
	authMessage: "",
	loading: false,
	user: null,
};

export default function (state = initialState, action) {
	const { type, payload } = action;
	switch (type) {
		case USER_LOADED:
			return {
				...state,
				isAuthenticated: true,
				loading: false,
				user: payload,
			};
		case REGISTER_SUCCESS:
		case LOGIN_SUCCESS:
			//setItemAsync('token', payload.token);
			return {
				...state,
				...payload,
				//token: getItemAsync('token'),
				isAuthenticated: true,
				loading: false,
			};
		case REGISTER_FAIL:
		case AUTH_ERROR:
		case LOGIN_FAIL:
		case LOGOUT:
			//deleteItemAsync('token');
			return {
				...state,
				token: null,
				isAuthenticated: false,
				authFailed: true,
				user: null,
				loading: false,
			};
		case RE_ATTEMPT:
			return {
				...state,
				authFailed: false,
				authMessage: "",
			};
		case LOADING:
			return {
				...state,
				loading: true,
			};
		default:
			return state;
	}
}
