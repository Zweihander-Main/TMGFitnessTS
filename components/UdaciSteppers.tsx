import React from 'react';
import {
	View,
	Text,
	TouchableOpacity,
	StyleSheet,
	Platform,
} from 'react-native';
import PropTypes from 'prop-types';
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { MetricType } from '../types';
import { purple, gray, white } from '../utils/colors';

const styles = StyleSheet.create({
	androidBtn: {
		backgroundColor: purple,
		borderRadius: 2,
		margin: 5,
		padding: 10,
	},
	flexDirectionRow: {
		flexDirection: 'row',
	},
	iosBtn: {
		backgroundColor: white,
		borderColor: purple,
		borderRadius: 3,
		borderWidth: 1,
		padding: 5,
		paddingLeft: 25,
		paddingRight: 25,
	},
	iosBtnMinus: {
		borderBottomRightRadius: 0,
		borderTopRightRadius: 0,
	},
	iosBtnPlus: {
		borderBottomLeftRadius: 0,
		borderLeftWidth: 0,
		borderTopLeftRadius: 0,
	},
	justifyContentSpaceBetween: {
		justifyContent: 'space-between',
	},
	metricCounter: {
		alignItems: 'center',
		justifyContent: 'center',
		width: 85,
	},
	metricCounterUnit: { color: gray, fontSize: 18 },
	metricCounterValue: { fontSize: 24, textAlign: 'center' },
	row: {
		alignItems: 'center',
		flex: 1,
		flexDirection: 'row',
	},
});

interface UdaciSteppersProps {
	max: number;
	unit: string;
	step: number;
	value: number;
	onIncrement: (metric: MetricType) => void;
	onDecrement: (metric: MetricType) => void;
}

const UdaciSteppers: React.FC<UdaciSteppersProps> = ({
	// max,
	unit,
	// step,
	value,
	onIncrement,
	onDecrement,
}) => {
	return (
		<View style={[styles.row, styles.justifyContentSpaceBetween]}>
			{Platform.OS === 'ios' ? (
				<View style={styles.flexDirectionRow}>
					<TouchableOpacity
						style={[styles.iosBtn, styles.iosBtnMinus]}
						onPress={onDecrement}
					>
						<Entypo name="minus" size={30} color={purple} />
					</TouchableOpacity>
					<TouchableOpacity
						style={[styles.iosBtn, styles.iosBtnPlus]}
						onPress={onIncrement}
					>
						<Entypo name="plus" size={30} color={purple} />
					</TouchableOpacity>
				</View>
			) : (
				<View style={styles.flexDirectionRow}>
					<TouchableOpacity
						style={styles.androidBtn}
						onPress={onDecrement}
					>
						<FontAwesome name="minus" size={30} color={white} />
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.androidBtn}
						onPress={onIncrement}
					>
						<FontAwesome name="plus" size={30} color={white} />
					</TouchableOpacity>
				</View>
			)}
			<View style={styles.metricCounter}>
				<Text style={styles.metricCounterValue}>{value}</Text>
				<Text style={styles.metricCounterUnit}>{unit}</Text>
			</View>
		</View>
	);
};

UdaciSteppers.propTypes = {
	max: PropTypes.number.isRequired,
	unit: PropTypes.string.isRequired,
	step: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
	onIncrement: PropTypes.func.isRequired,
	onDecrement: PropTypes.func.isRequired,
};

export default UdaciSteppers;
