import styled from 'styled-components/native';
import { gray } from '../../utils/colors';

export const MetricView = styled.View`
	flex-direction: row;
	margin-top: 12px;
`;
export const MetricDisplayNameText = styled.Text`
	font-size: 20px;
`;
export const MetricInfoText = styled.Text`
	color: ${gray};
	font-size: 16px;
`;
