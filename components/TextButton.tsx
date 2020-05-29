import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { purple } from '../utils/colors';

const styles = StyleSheet.create({
	reset: {
		color: purple,
		textAlign: 'center',
	},
});

interface TextButtonProps {
	children: React.ReactNode;
	onPress: () => void;
}

const TextButton: React.FC<TextButtonProps> = ({ children, onPress }) => {
	return (
		<TouchableOpacity style={styles.reset} onPress={onPress}>
			{children}
		</TouchableOpacity>
	);
};

TextButton.propTypes = {
	children: PropTypes.element.isRequired,
	onPress: PropTypes.func.isRequired,
};

export default TextButton;
