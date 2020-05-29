import {
	ReceiveEntries,
	AddEntry,
	RECEIVE_ENTRIES,
	ADD_ENTRY,
	Entries,
} from '../types';

export const receiveEntries = (entries: Entries): ReceiveEntries => {
	return {
		type: RECEIVE_ENTRIES,
		payload: {
			entries,
		},
	};
};

export const addEntry = (entry: Entries): AddEntry => {
	return {
		type: ADD_ENTRY,
		payload: {
			entry,
		},
	};
};
