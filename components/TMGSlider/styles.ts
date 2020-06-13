import styled from 'styled-components/native';
import { gray } from '../../utils/colors';

export const MetricCounterView = styled.View`
	align-items: center;
	justify-content: center;
	width: 85px;
`;

export const SliderRowView = styled.View`
	align-items: center;
	flex: 1;
	flex-direction: row;
`;

export const MainSlider = styled.Slider`
	flex: 1;
`;

export const UnitText = styled.Text`
	color: ${gray};
	font-size: 18px;
`;

export const ValueText = styled.Text`
	font-size: 24px;
	text-align: center;
`;
