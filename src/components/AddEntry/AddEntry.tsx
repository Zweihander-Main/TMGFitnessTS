import React from 'react';
import { Text, Platform } from 'react-native';
import {
	getMetricMetaInfo,
	timeToString,
	getDailyReminderValue,
	clearLocalNotification,
	setLocalNotification,
} from '../../utils/helpers';
import { MetricType, Entry } from '../../types';
import TMGSlider from '../TMGSlider';
import TMGSteppers from '../TMGSteppers';
import DateHeader from '../DateHeader';
import { Ionicons } from '@expo/vector-icons';
import TextButton from '../TextButton';
import { submitEntry, removeEntry } from '../../utils/api';
import { CommonActions } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { TabParamList } from '../../App';
import {
	iOSTouchableOpacity,
	androidTouchableOpacity,
	SubmitBtnText,
	CenteredInfoView,
	AddEntryContainerView,
	AddEntryRowView,
} from './styles';
import { PropsFromRedux } from './container';

interface SubmitBtnProps {
	onPress: () => void;
}

const SubmitBtn: React.FC<SubmitBtnProps> = ({ onPress }) => {
	const SubmitButton =
		Platform.OS === 'ios' ? iOSTouchableOpacity : androidTouchableOpacity;
	return (
		<SubmitButton onPress={onPress}>
			<SubmitBtnText>Submit</SubmitBtnText>
		</SubmitButton>
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
		const entry = { ...state, date: key };

		dispatch({ type: 'submit' });

		addEntryDispatch({ [key]: [entry] });
		toHome();
		void submitEntry({ key, entry });
		void clearLocalNotification().then(setLocalNotification);
	};

	const reset = (): void => {
		const key = timeToString();
		addEntryDispatch({ [key]: [getDailyReminderValue()] });
		toHome();
		void removeEntry(key);
	};

	const metaInfo = getMetricMetaInfo();

	if (alreadyLogged) {
		return (
			<CenteredInfoView>
				<Ionicons
					name={
						Platform.OS === 'ios' ? 'ios-happy-outline' : 'md-happy'
					}
					size={100}
				/>
				<Text>You already logged your information for today</Text>
				<TextButton onPress={reset} padding={10}>
					Reset
				</TextButton>
			</CenteredInfoView>
		);
	}

	return (
		<AddEntryContainerView>
			<DateHeader date={new Date().toLocaleDateString()} />
			{Object.keys(metaInfo).map((key) => {
				const { getIcon, type, ...rest } = metaInfo[key as MetricType];
				const value = state[key as MetricType];

				return (
					<AddEntryRowView key={key}>
						{getIcon()}
						{type === 'slider' ? (
							<TMGSlider
								value={value}
								onChange={(value) =>
									slider(key as MetricType, value)
								}
								{...rest}
							/>
						) : (
							<TMGSteppers
								value={value}
								onIncrement={() => increment(key as MetricType)}
								onDecrement={() => decrement(key as MetricType)}
								{...rest}
							/>
						)}
					</AddEntryRowView>
				);
			})}
			<SubmitBtn onPress={submit} />
		</AddEntryContainerView>
	);
};

export default AddEntry;
