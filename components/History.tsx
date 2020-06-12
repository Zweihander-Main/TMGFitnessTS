import React from 'react';
import {
	View,
	Text,
	StyleSheet,
	Platform,
	TouchableOpacity,
} from 'react-native';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { receiveEntries, addEntry } from '../actions';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import { fetchCalendarResults } from '../utils/api';
import { Agenda } from 'react-native-calendars';
import { white, shadow } from '../utils/colors';
import MetricCard from './MetricCard';
import { AppLoading } from 'expo';
import { RootState, RootAction, Entries, StateEntry } from '../types';
import { StackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';

interface HistoryOwnProps {
	navigation: StackNavigationProp<StackParamList, 'EntryDetail'>;
}

const History: React.FC<PropsFromRedux & HistoryOwnProps> = ({
	addEntryDispatch,
	receiveEntriesDispatch,
	entries,
	navigation,
}) => {
	const [ready, setReady] = React.useState(false);

	/* eslint-disable react-hooks/exhaustive-deps */
	React.useEffect(() => {
		void fetchCalendarResults()
			.then((calEntries) => receiveEntriesDispatch(calEntries))
			.then(({ payload }) => {
				if (!payload.entries[timeToString()]) {
					addEntryDispatch({
						[timeToString()]: [getDailyReminderValue()],
					});
				}
			})
			.then(() => setReady(true));
	}, []);
	/* eslint-enable */

	const renderItem: (item: StateEntry) => React.ReactNode = (item) => {
		const { today, date, ...metrics } = item;
		return (
			<View style={styles.item}>
				{today ? (
					<View>
						<Text style={styles.noDataText}>{today}</Text>
					</View>
				) : (
					<TouchableOpacity
						onPress={() =>
							navigation.navigate('EntryDetail', {
								entryId: date,
							})
						}
					>
						<MetricCard metrics={metrics} />
					</TouchableOpacity>
				)}
			</View>
		);
	};

	const renderEmptyDate: () => React.ReactNode = () => {
		return (
			<View style={styles.item}>
				<Text style={styles.noDataText}>
					You didn&apos;t log any data on this day.
				</Text>
			</View>
		);
	};

	if (ready === false) {
		return <AppLoading />;
	}

	return (
		<Agenda
			items={entries}
			renderItem={renderItem}
			renderEmptyDate={renderEmptyDate}
			rowHasChanged={(r1, r2) => r1 !== r2}
			selected={timeToString()}
		/>
	);
};

const styles = StyleSheet.create({
	item: {
		backgroundColor: white,
		borderRadius: Platform.OS === 'ios' ? 16 : 2,
		justifyContent: 'center',
		marginLeft: 10,
		marginRight: 10,
		marginTop: 17,
		padding: 20,
		shadowColor: shadow,
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowOpacity: 0.8,
		shadowRadius: 3,
	},
	noDataText: {
		fontSize: 20,
		paddingBottom: 20,
		paddingTop: 20,
	},
});

interface HistoryMappedProps {
	entries: RootState;
}

const mapState = (entries: RootState): HistoryMappedProps => {
	return {
		entries,
	};
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
	return {
		addEntryDispatch: (entry: Entries) => dispatch(addEntry(entry)),
		receiveEntriesDispatch: (entries: Entries) =>
			dispatch(receiveEntries(entries)),
	};
};

const connector = connect(mapState, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const connectedHistory = connector(History);

export default connectedHistory;
