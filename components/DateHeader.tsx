import React from 'react';
import { Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { purple } from '../utils/colors';

const styles = StyleSheet.create({
	textStyle: {
		color: purple,
		fontSize: 25,
	},
});

interface DateHeaderProps {
	date: string;
}

const DateHeader: React.FC<DateHeaderProps> = ({ date }) => {
	return <Text style={styles.textStyle}>{date}</Text>;
};

DateHeader.propTypes = {
	date: PropTypes.string.isRequired,
};

export default DateHeader;
