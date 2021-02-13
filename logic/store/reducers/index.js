import { combineReducers } from 'redux';
import auth from './auth';
import expense from './expense';
import modal from "./modal";

export default combineReducers({
	auth,
	expense,
	modal,
});
