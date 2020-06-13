import React from 'react';
import { TouchableOpacity } from 'react-native';
import { TextButtonText } from './styles';

interface TextButtonProps {
	children: string;
	onPress: () => void;
	padding: number;
}

const TextButton: React.FC<TextButtonProps> = ({
	children,
	onPress,
	padding,
}) => {
	return (
		<TouchableOpacity onPress={onPress}>
			<TextButtonText padding={padding}>{children}</TextButtonText>
		</TouchableOpacity>
	);
};

export default TextButton;
