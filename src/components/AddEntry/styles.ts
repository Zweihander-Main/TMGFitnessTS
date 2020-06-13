import styled from 'styled-components/native';
import { white, purple } from '../../utils/colors';

export const iOSTouchableOpacity = styled.TouchableOpacity`
	background-color: ${purple};
	border-radius: 7px;
	height: 45px;
	margin-left: 40px;
	margin-right: 40px;
	padding: 10px;
`;

export const androidTouchableOpacity = styled.TouchableOpacity`
	align-items: center;
	align-self: flex-end;
	background-color: ${purple};
	border-radius: 2px;
	height: 45px;
	justify-content: center;
	padding: 10px 30px;
`;

export const SubmitBtnText = styled.Text`
	color: ${white};
	font-size: 22px;
	text-align: center;
`;

export const CenteredInfoView = styled.View`
	align-items: center;
	flex: 1;
	justify-content: center;
`;

export const AddEntryContainerView = styled.View`
	background-color: ${white};
	flex: 1;
	padding: 20px;
`;

export const AddEntryRowView = styled.View`
	align-items: center;
	flex: 1;
	flex-direction: row;
`;
