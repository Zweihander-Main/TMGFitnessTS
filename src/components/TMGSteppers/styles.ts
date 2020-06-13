import styled from 'styled-components/native';
import { purple, gray, white } from '../../utils/colors';

export const AndroidBtnTouchableOpacity = styled.TouchableOpacity`
	background-color: ${purple};
	border-radius: 2px;
	margin: 5px;
	padding: 10px;
`;

export const FlexDirectionRowView = styled.View`
	flex-direction: row;
`;

export const iosBtn = styled.TouchableOpacity`
	background-color: ${white};
	border-color: ${purple};
	border-radius: 3px;
	border-width: 1;
	padding: 5px 25px;
`;

export const IosBtnMinusTouchableOpacity = styled(iosBtn)`
	border-bottom-right-radius: 0px;
	border-top-right-radius: 0px;
`;

export const IosBtnPlusTouchableOpacity = styled(iosBtn)`
	border-bottom-left-radius: 0px;
	border-left-width: 0px;
	border-top-left-radius: 0px;
`;

export const MetricCounterView = styled.View`
	align-items: center;
	justify-content: center;
	width: 85px;
`;

export const MetricCounterUnitText = styled.Text`
	color: ${gray};
	font-size: 18px;
`;

export const MetricCounterValueText = styled.Text`
	font-size: 24px;
	text-align: center;
`;

export const RowView = styled.View`
	align-items: center;
	flex: 1;
	flex-direction: row;
	justify-content: space-between;
`;
