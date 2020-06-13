import React from 'react';
import { View } from 'react-native';
import { getMetricMetaInfo } from '../../utils/helpers';
import { MetricType } from '../../types';
import { MetricView, MetricInfoText, MetricDisplayNameText } from './styles';

interface MetricCardProps {
	metrics: Partial<Record<MetricType, number | undefined>>;
}

const MetricCard: React.FC<MetricCardProps> = ({ metrics }) => {
	return (
		<View>
			{Object.keys(metrics).map((metric) => {
				if (metric === 'today' || metric === 'date') {
					return null;
				}
				const { getIcon, displayName, unit } = getMetricMetaInfo(
					metric as MetricType
				);
				return (
					<MetricView key={metric}>
						{getIcon()}
						<View>
							<MetricDisplayNameText>
								{displayName}
							</MetricDisplayNameText>
							<MetricInfoText>
								{metrics[metric]} {unit}
							</MetricInfoText>
						</View>
					</MetricView>
				);
			})}
		</View>
	);
};

export default MetricCard;
