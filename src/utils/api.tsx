import AsyncStorage from '@react-native-community/async-storage';
import { CALENDAR_STORAGE_KEY, formatCalendarResults } from './_calendar';
import { Entries } from '../types';

export function fetchCalendarResults(): Promise<Entries> {
	void AsyncStorage.clear();
	return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then(
		formatCalendarResults
	);
}

type Entry = { [key: string]: unknown };

export function submitEntry({
	entry,
	key,
}: {
	entry: Entry;
	key: string;
}): Promise<void> {
	return AsyncStorage.mergeItem(
		CALENDAR_STORAGE_KEY,
		JSON.stringify({ [key]: entry })
	);
}

export function removeEntry(key: string): Promise<void> {
	return AsyncStorage.getItem(CALENDAR_STORAGE_KEY).then((results) => {
		if (results) {
			const data = JSON.parse(results) as { [key: string]: Entry };
			delete data[key];
			return AsyncStorage.setItem(
				CALENDAR_STORAGE_KEY,
				JSON.stringify(data)
			);
		}
		return Promise.resolve();
	});
}
