import { Reducer } from 'redux';
import {
	RECEIVE_ENTRIES,
	ADD_ENTRY,
	RootState,
	EntryActionTypes,
} from '../types';

const entries: Reducer<RootState, EntryActionTypes> = (state = {}, action) => {
	switch (action.type) {
		case RECEIVE_ENTRIES: {
			return {
				...state,
				...action.payload.entries,
			};
		}
		case ADD_ENTRY: {
			return {
				...state,
				...action.payload.entry,
			};
		}
		default: {
			return state;
		}
	}
};

export default entries;
