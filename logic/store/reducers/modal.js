import { SET_MODAL, REMOVE_MODAL } from "../actions/types";

const initialState = false;

export default function (state = initialState, action) {
	const { type, payload } = action;

	switch (type) {
		case SET_MODAL:
			return {
				...state,
				payload,
			};
		case REMOVE_MODAL:
			return false;
		default:
			return state;
	}
}
