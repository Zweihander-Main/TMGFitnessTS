import React from 'react';
import { Platform, GestureResponderEvent } from 'react-native';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import {
	RowView,
	FlexDirectionRowView,
	IosBtnMinusTouchableOpacity,
	IosBtnPlusTouchableOpacity,
	AndroidBtnTouchableOpacity,
	MetricCounterUnitText,
	MetricCounterValueText,
	MetricCounterView,
} from './styles';
import { purple, white } from '../../utils/colors';

interface UdaciSteppersProps {
	unit: string;
	value: number;
	onIncrement: (metric: GestureResponderEvent) => void;
	onDecrement: (metric: GestureResponderEvent) => void;
}

const TMGSteppers: React.FC<UdaciSteppersProps> = ({
	unit,
	value,
	onIncrement,
	onDecrement,
}) => {
	return (
		<RowView>
			{Platform.OS === 'ios' ? (
				<FlexDirectionRowView>
					<IosBtnMinusTouchableOpacity onPress={onDecrement}>
						<Entypo name="minus" size={30} color={purple} />
					</IosBtnMinusTouchableOpacity>
					<IosBtnPlusTouchableOpacity onPress={onIncrement}>
						<Entypo name="plus" size={30} color={purple} />
					</IosBtnPlusTouchableOpacity>
				</FlexDirectionRowView>
			) : (
				<FlexDirectionRowView>
					<AndroidBtnTouchableOpacity onPress={onDecrement}>
						<FontAwesome name="minus" size={30} color={white} />
					</AndroidBtnTouchableOpacity>
					<AndroidBtnTouchableOpacity onPress={onIncrement}>
						<FontAwesome name="plus" size={30} color={white} />
					</AndroidBtnTouchableOpacity>
				</FlexDirectionRowView>
			)}
			<MetricCounterView>
				<MetricCounterValueText>{value}</MetricCounterValueText>
				<MetricCounterUnitText>{unit}</MetricCounterUnitText>
			</MetricCounterView>
		</RowView>
	);
};

export default TMGSteppers;
