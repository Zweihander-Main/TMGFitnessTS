import styled from 'styled-components/native';
import { white, shadow } from '../../utils/colors';
import { Platform } from 'react-native';

export const AgendaItemView = styled.View`
	background-color: ${white};
	border-radius: ${Platform.OS === 'ios' ? '16px' : '2px'};
	justify-content: center;
	margin: 17px 10px 0 10px;
	padding: 20px;
	box-shadow: 0px 3px 3px ${shadow};
`;

export const AgendaItemText = styled.Text`
	font-size: 20px;
	padding: 20px 0;
`;
