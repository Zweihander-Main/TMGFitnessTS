import React from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';
import { gray } from '../utils/colors';

const styles = StyleSheet.create({
	metricCounter: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 85,
	},
	row: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
	},
	slider: {
		flex: 1,
	},
	unit: {
		color: gray,
		fontSize: 18,
	},
	value: {
		fontSize: 24,
		textAlign: 'center',
	},
});

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
		<View style={styles.row}>
			<Slider
				style={styles.slider}
				step={step}
				value={value}
				maximumValue={max}
				minimumValue={0}
				onValueChange={onChange}
			/>
			<View style={styles.metricCounter}>
				<Text style={styles.value}>{value}</Text>
				<Text style={styles.unit}>{unit}</Text>
			</View>
		</View>
	);
};

export default TMGSlider;
