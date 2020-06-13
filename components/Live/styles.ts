import styled from 'styled-components/native';
import { purple, white, transparentWhite } from '../../utils/colors';

export const NullActivityIndicator = styled.ActivityIndicator`
	margin-top: 30px;
`;

export const InfoCenteredView = styled.View`
	align-items: center;
	flex: 1;
	justify-content: center;
	margin: 0 30px;
`;

export const AskPermissionTouchableOpacity = styled.TouchableOpacity`
	align-self: center;
	background-color: ${purple};
	border-radius: 5px;
	margin: 20px;
	padding: 10px;
`;

export const AskPermissionText = styled.Text`
	color: ${white};
	font-size: 20px;
`;

export const LiveContainerView = styled.View`
	flex: 1;
	justify-content: space-between;
`;

export const DirectionContainerView = styled.View`
	flex: 1;
	justify-content: center;
`;

export const DirectionText = styled.Text`
	color: ${purple};
	font-size: 120px;
	text-align: center;
`;

export const HeaderText = styled.Text`
	font-size: 35px;
	text-align: center;
`;

export const HeaderWhiteText = styled(HeaderText)`
	color: ${white};
`;

export const SubHeaderText = styled.Text`
	font-size: 25px;
	text-align: center;
	margin-top: 5px;
	color: ${white};
`;

export const MetricView = styled.View`
	background-color: ${transparentWhite};
	flex: 1;
	margin: 20px 10px;
	padding: 15px 0;
`;

export const MetricContainerView = styled.View`
	background-color: ${purple};
	flex-direction: row;
	justify-content: space-around;
`;
