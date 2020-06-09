import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	Platform,
	StyleSheet,
} from 'react-native';
import {
	getMetricMetaInfo,
	timeToString,
	getDailyReminderValue,
	clearLocalNotification,
	setLocalNotification,
} from '../utils/helpers';
import { MetricType, RootState, Entries, Entry, RootAction } from '../types';
import TMGSlider from './TMGSlider';
import TMGSteppers from './TMGSteppers';
import DateHeader from './DateHeader';
import { Ionicons } from '@expo/vector-icons';
import TextButton from './TextButton';
import { submitEntry, removeEntry } from '../utils/api';
import { Dispatch } from 'redux';
import { connect, ConnectedProps } from 'react-redux';
import { addEntry } from '../actions';
import { white, purple } from '../utils/colors';
import { CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TabParamList } from '../App';

const styles = StyleSheet.create({
	alreadyLoggedReset: {
		padding: 10,
	},
	androidSubmitBtn: {
		alignItems: 'center',
		alignSelf: 'flex-end',
		backgroundColor: purple,
		borderRadius: 2,
		height: 45,
		justifyContent: 'center',
		padding: 10,
		paddingLeft: 30,
		paddingRight: 30,
	},
	center: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
	},
	container: {
		backgroundColor: white,
		flex: 1,
		padding: 20,
	},
	iosSubmitBtn: {
		backgroundColor: purple,
		borderRadius: 7,
		height: 45,
		marginLeft: 40,
		marginRight: 40,
		padding: 10,
	},
	row: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
	},
	submitBtnText: {
		color: white,
		fontSize: 22,
		textAlign: 'center',
	},
});

interface SubmitBtnProps {
	onPress: () => void;
}

const SubmitBtn: React.FC<SubmitBtnProps> = ({ onPress }) => {
	return (
		<TouchableOpacity
			style={
				Platform.OS === 'ios'
					? styles.iosSubmitBtn
					: styles.androidSubmitBtn
			}
			onPress={onPress}
		>
			<Text style={styles.submitBtnText}>Submit</Text>
		</TouchableOpacity>
	);
};

type AddEntryReducerState = Entry;

type AddEntryReducerActions =
	| {
			type: 'increment';
			metric: MetricType;
			step: number;
			max: number;
	  }
	| {
			type: 'decrement';
			metric: MetricType;
			step: number;
	  }
	| { type: 'slideTo'; metric: MetricType; value: number }
	| { type: 'submit' };

function addEntryReducer(
	state: AddEntryReducerState,
	action: AddEntryReducerActions
) {
	switch (action.type) {
		case 'increment': {
			const count = state[action.metric] + action.step;
			return {
				...state,
				[action.metric]: count > action.max ? action.max : count,
			};
		}
		case 'decrement': {
			const count = state[action.metric] - action.step;
			return {
				...state,
				[action.metric]: count < 0 ? 0 : count,
			};
		}
		case 'slideTo': {
			return {
				...state,
				[action.metric]: action.value,
			};
		}
		case 'submit': {
			return {
				run: 0,
				bike: 0,
				swim: 0,
				sleep: 0,
				eat: 0,
			};
		}
	}
}

interface NavigationOwnProps {
	navigation: StackNavigationProp<TabParamList, 'AddEntry'>;
}

const AddEntry: React.FC<PropsFromRedux & NavigationOwnProps> = ({
	alreadyLogged = false,
	addEntryDispatch,
	navigation,
}) => {
	const [state, dispatch] = React.useReducer(addEntryReducer, {
		run: 0,
		bike: 0,
		swim: 0,
		sleep: 0,
		eat: 0,
	});

	const increment = (metric: MetricType): void => {
		const { max, step } = getMetricMetaInfo(metric);
		dispatch({ type: 'increment', metric, step, max });
	};

	const decrement = (metric: MetricType): void => {
		const { step } = getMetricMetaInfo(metric);
		dispatch({ type: 'decrement', metric, step });
	};

	const slider = (metric: MetricType, value: number): void => {
		dispatch({ type: 'slideTo', metric, value });
	};

	const toHome = () => {
		navigation.dispatch(CommonActions.navigate({ name: 'AddEntry' }));
	};

	const submit = (): void => {
		const key = timeToString();
		const entry = state;

		dispatch({ type: 'submit' });

		addEntryDispatch({ [key]: entry });
		toHome();
		void submitEntry({ key, entry });
		void clearLocalNotification().then(setLocalNotification);
	};

	const reset = (): void => {
		const key = timeToString();
		addEntryDispatch({ [key]: getDailyReminderValue() });
		toHome();
		void removeEntry(key);
	};

	const metaInfo = getMetricMetaInfo();

	/* eslint-disable react-native/no-raw-text */
	if (alreadyLogged) {
		return (
			<View style={styles.center}>
				<Ionicons
					name={
						Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'
					}
					size={100}
				/>
				<Text>You already logged your information for today</Text>
				<TextButton onPress={reset} style={styles.alreadyLoggedReset}>
					Reset
				</TextButton>
			</View>
		);
	}
	/* eslint-enable */

	return (
		<View style={styles.container}>
			<DateHeader date={new Date().toLocaleDateString()} />
			{Object.keys(metaInfo).map((key: MetricType) => {
				const { getIcon, type, ...rest } = metaInfo[key];
				const value = state[key];

				return (
					<View key={key} style={styles.row}>
						{getIcon()}
						{type === 'slider' ? (
							<TMGSlider
								value={value}
								onChange={(value) => slider(key, value)}
								{...rest}
							/>
						) : (
							<TMGSteppers
								value={value}
								onIncrement={() => increment(key)}
								onDecrement={() => decrement(key)}
								{...rest}
							/>
						)}
					</View>
				);
			})}
			<SubmitBtn onPress={submit} />
		</View>
	);
};
interface AddEntryMappedProps {
	alreadyLogged: boolean;
}

const mapState = (state: RootState): AddEntryMappedProps => {
	const key = timeToString();
	return {
		alreadyLogged: state[key] && typeof state[key].today === 'undefined',
	};
};

const mapDispatchToProps = (dispatch: Dispatch<RootAction>) => {
	return {
		addEntryDispatch: (entry: Entries) => dispatch(addEntry(entry)),
	};
};

const connector = connect(mapState, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const connectedAddEntry = connector(AddEntry);

export default connectedAddEntry;
