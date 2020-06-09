import React from 'react';
import { TouchableOpacity, StyleSheet, Text, TextStyle } from 'react-native';
import { purple } from '../utils/colors';

const styles = StyleSheet.create({
	reset: {
		color: purple,
		textAlign: 'center',
	},
});

interface TextButtonProps {
	children: string;
	onPress: () => void;
	style: TextStyle;
}

const TextButton: React.FC<TextButtonProps> = ({
	children,
	onPress,
	style,
}) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<Text style={[styles.reset, style]}>{children}</Text>
		</TouchableOpacity>
	);
};

export default TextButton;
