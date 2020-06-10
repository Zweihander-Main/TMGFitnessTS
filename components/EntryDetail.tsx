import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { timeToString, getDailyReminderValue } from '../utils/helpers';
import MetricCard from './MetricCard';
import { white } from '../utils/colors';
import TextButton from './TextButton';
import { addEntry } from '../actions';
import { removeEntry } from '../utils/api';
import { RootState, RootAction } from '../types';
import { RouteProp } from '@react-navigation/native';
import { StackParamList } from '../App';
import { StackNavigationProp } from '@react-navigation/stack';

interface EntryDetailOwnProps {
	route: RouteProp<StackParamList, 'EntryDetail'>;
	navigation: StackNavigationProp<StackParamList, 'EntryDetail'>;
}

type EntryDetailProps = PropsFromRedux & EntryDetailOwnProps;

const EntryDetail: React.FC<EntryDetailProps> = ({
	metrics,
	remove,
	goBack,
	entryId,
	navigation,
}) => {
	const reset = () => {
		remove();
		goBack();
		void removeEntry(entryId);
	};

	React.useEffect(() => {
		if (!entryId) return;

		const year = entryId.slice(0, 4);
		const month = entryId.slice(5, 7);
		const day = entryId.slice(8);
		navigation.setOptions({ title: `${month}/${day}/${year}` });
	}, [entryId, navigation]);
	/* eslint-disable react-native/no-raw-text */
	return (
		<View style={styles.container}>
			<MetricCard metrics={metrics} date={entryId} />
			<TextButton style={styles.resetButtonText} onPress={reset}>
				RESET
			</TextButton>
		</View>
	);
	/* eslint-enable */
};

const compareEntryDetailProps = (
	_prevProps: EntryDetailProps,
	nextProps: EntryDetailProps
) => {
	return nextProps.metrics !== null && !nextProps.metrics.today;
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: white,
		flex: 1,
		padding: 15,
	},
	resetButtonText: {
		margin: 20,
	},
});

function mapState(state: RootState, { route }: EntryDetailOwnProps) {
	const { entryId } = route.params;

	return {
		entryId,
		metrics: state[entryId],
	};
}

function mapDispatchToProps(
	dispatch: Dispatch<RootAction>,
	{ route, navigation }: EntryDetailOwnProps
) {
	const { entryId } = route.params;

	return {
		remove: () =>
			dispatch(
				addEntry({
					[entryId]:
						timeToString() === entryId
							? getDailyReminderValue()
							: null,
				})
			),
		goBack: () => navigation.goBack(),
	};
}

const connector = connect(mapState, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const memoizedEntryDetails = React.memo(EntryDetail, compareEntryDetailProps);

const connectedEntryDetails = connector(memoizedEntryDetails);

export default connectedEntryDetails;
