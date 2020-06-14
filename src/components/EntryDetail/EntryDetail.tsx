import React from 'react';
import MetricCard from '../MetricCard';
import TextButton from '../TextButton';
import { removeEntry } from '../../utils/api';
import { RouteProp } from '@react-navigation/native';
import { StackParamList } from '../../types';
import { StackNavigationProp } from '@react-navigation/stack';
import { PropsFromRedux } from './container';
import { EntryDetailView } from './styles';

export interface EntryDetailOwnProps {
	route: RouteProp<StackParamList, 'EntryDetail'>;
	navigation: StackNavigationProp<StackParamList, 'EntryDetail'>;
}

export type EntryDetailProps = PropsFromRedux & EntryDetailOwnProps;

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

	/* eslint-disable react-hooks/exhaustive-deps */
	React.useEffect(() => {
		if (!entryId) return;

		const year = entryId.slice(0, 4);
		const month = entryId.slice(5, 7);
		const day = entryId.slice(8);
		navigation.setOptions({ title: `${month}/${day}/${year}` });
	}, [entryId]);
	/* eslint-enable */

	return (
		<EntryDetailView>
			<MetricCard metrics={metrics} />
			<TextButton padding={20} onPress={reset}>
				RESET
			</TextButton>
		</EntryDetailView>
	);
};

export default EntryDetail;
