import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { receiveEntries, addEntry } from '../../actions';
import { RootState, RootAction, Entries } from '../../types';
import History from './History';

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

export type PropsFromRedux = ConnectedProps<typeof connector>;

const connectedHistory = connector(History);

export default connectedHistory;
