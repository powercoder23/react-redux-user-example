import initialState from './initialState';
import { FETCH_STUFF, RECEIVE_STUFF, ADD_STUFF, DEL_STUFF, EDIT_STUFF } from '../actions/allActions';

export default function stuff(state = initialState.stuff, action) {
	let newState;
	switch (action.type) {
		case ADD_STUFF:
			return [
				...state,
				action.stuff
			]
		case DEL_STUFF:
			return [
				...state.slice(0, action.index),
				...state.slice(action.index + 1)
			];
		case EDIT_STUFF:
			return [action.data];
		case FETCH_STUFF:
			return action;
		case RECEIVE_STUFF:
			newState = action.stuff;
			return newState;
		default:
			return state;
	}
}