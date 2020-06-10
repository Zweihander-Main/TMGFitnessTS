import AsyncStorage from '@react-native-community/async-storage';
import { getMetricMetaInfo, timeToString } from './helpers';
import { StorageEntry } from '../types';

export const CALENDAR_STORAGE_KEY = 'UdaciFitness:calendar';

function getRandomNumber(max: number): number {
	return Math.floor(Math.random() * max) + 0;
}

function setDummyData() {
	const { run, bike, swim, sleep, eat } = getMetricMetaInfo();

	const dummyData: StorageEntry = {};
	const timestamp = Date.now();

	for (let i = -183; i < 0; i++) {
		const time = timestamp + i * 24 * 60 * 60 * 1000;
		const strTime = timeToString(time);
		dummyData[strTime] =
			getRandomNumber(3) % 2 === 0
				? {
						run: getRandomNumber(run.max),
						bike: getRandomNumber(bike.max),
						swim: getRandomNumber(swim.max),
						sleep: getRandomNumber(sleep.max),
						eat: getRandomNumber(eat.max),
				  }
				: null;
	}

	AsyncStorage.setItem(
		CALENDAR_STORAGE_KEY,
		JSON.stringify(dummyData)
	).finally(() => {
		null;
	});

	return dummyData;
}

function setMissingDates(dates: StorageEntry) {
	const timestamp = Date.now();

	for (let i = -183; i < 0; i++) {
		const time = timestamp + i * 24 * 60 * 60 * 1000;
		const strTime = timeToString(time);

		if (typeof dates[strTime] === 'undefined') {
			dates[strTime] = null;
		}
	}

	return dates;
}

export function formatCalendarResults(results: string | null): StorageEntry {
	return results === null
		? setDummyData()
		: setMissingDates(JSON.parse(results));
}
