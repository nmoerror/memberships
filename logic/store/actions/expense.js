import axios from 'axios';
import {
  SAVE_EXPENSE_SUCCESS,
  SAVE_EXPENSE_FAIL,
  LOAD_EXPENSES,
  LOAD_EXPENSES_ERROR
} from './types';

//import { setAlert } from './alert';

// Load User
export const loadExpenses = () => async (dispatch) => {
  //if (AsyncStorage.getItem('token')) {
  //setAuthToken(AsyncStorage.getItem('token'));
  //}
  try {
    const res = await axios.get('http://172.20.10.6:5366/api/v1/expenses/');
    
    console.log(res);
    dispatch({
      type: LOAD_EXPENSES,
      payload: res.data,
    });

    // MUST GET PROFILE HERE
  } catch (err) {
    dispatch({
      type: LOAD_EXPENSES_ERROR,
    });
  }
};