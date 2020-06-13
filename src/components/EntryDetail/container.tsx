import React from 'react';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { timeToString, getDailyReminderValue } from '../../utils/helpers';
import { addEntry } from '../../actions';
import { RootState, RootAction } from '../../types';
import EntryDetail, {
	EntryDetailProps,
	EntryDetailOwnProps,
} from './EntryDetail';

const compareEntryDetailProps = (
	_prevProps: EntryDetailProps,
	nextProps: EntryDetailProps
) => {
	return nextProps.metrics !== null && !nextProps.metrics.today;
};

function mapState(state: RootState, { route }: EntryDetailOwnProps) {
	const { entryId } = route.params;

	return {
		entryId,
		metrics: state[entryId][0],
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
							? [getDailyReminderValue()]
							: [],
				})
			),
		goBack: () => navigation.goBack(),
	};
}

const connector = connect(mapState, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

const memoizedEntryDetails = React.memo(EntryDetail, compareEntryDetailProps);

const connectedEntryDetails = connector(memoizedEntryDetails);

export default connectedEntryDetails;
