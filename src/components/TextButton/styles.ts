import { purple } from '../../utils/colors';
import styled from 'styled-components/native';

interface TextButtonTextProps {
	padding?: number;
}

export const TextButtonText = styled.Text`
	color: ${purple};
	text-align: center;
	padding: ${(props: TextButtonTextProps) =>
		props.padding ? props.padding.toString() + 'px' : '0px'};
`;
