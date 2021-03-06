import { Action } from 'redux';
import { AgendaItemsMap } from 'react-native-calendars';

export type MetricType = 'run' | 'bike' | 'swim' | 'sleep' | 'eat';

export type Entry = Record<MetricType, number>;
export type StateEntry = Partial<Entry> & { today?: string } & { date: string };
export type Entries = AgendaItemsMap<StateEntry>;

export const RECEIVE_ENTRIES = 'RECEIVE_ENTRIES';
export const ADD_ENTRY = 'ADD_ENTRY';

export interface ReceiveEntries extends Action<typeof RECEIVE_ENTRIES> {
	type: typeof RECEIVE_ENTRIES;
	payload: {
		entries: Entries;
	};
}

export interface AddEntry extends Action<typeof ADD_ENTRY> {
	type: typeof ADD_ENTRY;
	payload: {
		entry: Entries;
	};
}

export type RootState = Entries;

export type EntryActionTypes = ReceiveEntries | AddEntry;

export type RootAction = EntryActionTypes;

export type TabParamList = {
	History: undefined;
	AddEntry: undefined;
	Live: undefined;
};

export type StackParamList = {
	Home: undefined;
	EntryDetail: { entryId: string };
};
