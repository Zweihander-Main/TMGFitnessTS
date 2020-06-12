import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { getMetricMetaInfo } from '../utils/helpers';
import { gray } from '../utils/colors';
import { MetricType } from '../types';

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
					<View style={styles.metric} key={metric}>
						{getIcon()}
						<View>
							<Text style={styles.metricDisplayName}>
								{displayName}
							</Text>
							<Text style={styles.metricInfo}>
								{metrics[metric]} {unit}
							</Text>
						</View>
					</View>
				);
			})}
		</View>
	);
};

const styles = StyleSheet.create({
	metric: {
		flexDirection: 'row',
		marginTop: 12,
	},
	metricDisplayName: {
		fontSize: 20,
	},
	metricInfo: {
		color: gray,
		fontSize: 16,
	},
});

export default MetricCard;
