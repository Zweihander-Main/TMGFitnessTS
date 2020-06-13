import React from 'react';
import {
	SliderRowView,
	MainSlider,
	MetricCounterView,
	UnitText,
	ValueText,
} from './styles';

interface UdaciSliderProps {
	max: number;
	unit: string;
	step: number;
	value: number;
	onChange: (value: number) => void;
}

const TMGSlider: React.FC<UdaciSliderProps> = ({
	max,
	unit,
	step,
	value,
	onChange,
}) => {
	return (
		<SliderRowView>
			<MainSlider
				step={step}
				value={value}
				maximumValue={max}
				minimumValue={0}
				onValueChange={onChange}
			/>
			<MetricCounterView>
				<ValueText>{value}</ValueText>
				<UnitText>{unit}</UnitText>
			</MetricCounterView>
		</SliderRowView>
	);
};

export default TMGSlider;
