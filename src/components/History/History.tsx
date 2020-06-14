import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { timeToString, getDailyReminderValue } from '../../utils/helpers';
import { fetchCalendarResults } from '../../utils/api';
import { Agenda } from 'react-native-calendars';
import MetricCard from '../MetricCard';
import { AppLoading } from 'expo';
import { StateEntry, StackParamList } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { PropsFromRedux } from './container';
import { AgendaItemText, AgendaItemView } from './styles';

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
			<AgendaItemView>
				{today ? (
					<View>
						<AgendaItemText>{today}</AgendaItemText>
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
			</AgendaItemView>
		);
	};

	const renderEmptyDate: () => React.ReactNode = () => {
		return (
			<AgendaItemView>
				<AgendaItemText>
					You didn&apos;t log any data on this day.
				</AgendaItemText>
			</AgendaItemView>
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

export default History;
