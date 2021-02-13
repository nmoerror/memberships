import { SET_MODAL, REMOVE_MODAL } from "./types";

export const setModal = (msg) => (dispatch) => {
	const id = Math.random();

	dispatch({
		type: SET_MODAL,
		payload: { msg, id },
	});
};

export const removeModal = () => (dispatch) => {
	dispatch({
		type: REMOVE_MODAL,
	});
};
