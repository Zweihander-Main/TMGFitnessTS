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

const EntryDetail: React.FC<PropsFromRedux & EntryDetailOwnProps> = ({
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

	const setNavigationOptions = (title: string) => {
		navigation.setOptions({ title });
	};

	React.useEffect(() => {
		if (!entryId) return;

		const year = entryId.slice(0, 4);
		const month = entryId.slice(5, 7);
		const day = entryId.slice(8);

		setNavigationOptions(`${month}/${day}/${year}`);
	}, [entryId]);

	return (
		<View style={styles.container}>
			<MetricCard metrics={metrics} />
			<TextButton style={{ margin: 20 }} onPress={reset}>
				RESET
			</TextButton>
		</View>
	);
};

const compareEntryDetailProps = (
	_prevProps: PropsFromRedux,
	nextProps: PropsFromRedux
) => {
	return nextProps.metrics !== null && !nextProps.metrics.today;
};

const styles = StyleSheet.create({
	container: {
		backgroundColor: white,
		flex: 1,
		padding: 15,
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
	{ route }: EntryDetailOwnProps
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

const connectedEntryDetails = connector(EntryDetail);

const memoizedConnectedEntryDetails = React.memo(
	connectedEntryDetails,
	compareEntryDetailProps
);

export default memoizedConnectedEntryDetails;
