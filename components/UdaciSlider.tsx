import React from 'react';
import { View, Text, Slider, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';

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
		color: 'gray',
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

const UdaciSlider: React.FC<UdaciSliderProps> = ({
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

UdaciSlider.propTypes = {
	max: PropTypes.number.isRequired,
	unit: PropTypes.string.isRequired,
	step: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
	onChange: PropTypes.func.isRequired,
};

export default UdaciSlider;
