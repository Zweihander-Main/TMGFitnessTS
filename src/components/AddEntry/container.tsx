import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { RootState, RootAction, Entries } from '../../types';
import { addEntry } from '../../actions';
import { timeToString } from '../../utils/helpers';
import AddEntry from './AddEntry';

interface AddEntryMappedProps {
	alreadyLogged: boolean | null;
}

const mapState = (state: RootState): AddEntryMappedProps => {
	const key = timeToString();
	return {
		alreadyLogged:
			state[key] &&
			state[key][0] &&
			typeof state[key][0]['today'] === 'undefined',
	};
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
	return {
		addEntryDispatch: (entry: Entries) => dispatch(addEntry(entry)),
	};
};

const connector = connect(mapState, mapDispatchToProps);

export type PropsFromRedux = ConnectedProps<typeof connector>;

const connectedAddEntry = connector(AddEntry);

export default connectedAddEntry;
