import { combineReducers } from 'redux';
import auth from './auth';
import expense from './expense';

export default combineReducers({
	auth,
	expense
});
