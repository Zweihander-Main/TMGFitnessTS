import React from 'react';
import { View, StyleSheet } from 'react-native';
import {
	FontAwesome,
	MaterialIcons,
	MaterialCommunityIcons,
} from '@expo/vector-icons';
import { red, orange, blue, lightPurp, pink, white } from './colors';
import { MetricType } from '../types';

const styles = StyleSheet.create({
	iconContainer: {
		alignItems: 'center',
		borderRadius: 8,
		height: 50,
		justifyContent: 'center',
		marginRight: 20,
		padding: 5,
		width: 50,
	},
});

interface Metric {
	displayName: string;
	max: number;
	unit: string;
	step: number;
	type: string;
	getIcon: () => React.ReactNode;
}

type MetricInfo = Record<MetricType, Metric>;

export function getMetricMetaInfo(metric: MetricType): Metric;
export function getMetricMetaInfo(): MetricInfo;
export function getMetricMetaInfo(metric?: MetricType): Metric | MetricInfo {
	const info: MetricInfo = {
		run: {
			displayName: 'Run',
			max: 50,
			unit: 'miles',
			step: 1,
			type: 'steppers',
			getIcon() {
				return (
					<View
						style={[styles.iconContainer, { backgroundColor: red }]}
					>
						<MaterialIcons
							name="directions-run"
							color={white}
							size={35}
						/>
					</View>
				);
			},
		},
		bike: {
			displayName: 'Bike',
			max: 100,
			unit: 'miles',
			step: 1,
			type: 'steppers',
			getIcon() {
				return (
					<View
						style={[
							styles.iconContainer,
							{ backgroundColor: orange },
						]}
					>
						<MaterialCommunityIcons
							name="bike"
							color={white}
							size={32}
						/>
					</View>
				);
			},
		},
		swim: {
			displayName: 'Swim',
			max: 9900,
			unit: 'meters',
			step: 100,
			type: 'steppers',
			getIcon() {
				return (
					<View
						style={[
							styles.iconContainer,
							{ backgroundColor: blue },
						]}
					>
						<MaterialCommunityIcons
							name="swim"
							color={white}
							size={35}
						/>
					</View>
				);
			},
		},
		sleep: {
			displayName: 'Sleep',
			max: 24,
			unit: 'hours',
			step: 1,
			type: 'slider',
			getIcon() {
				return (
					<View
						style={[
							styles.iconContainer,
							{ backgroundColor: lightPurp },
						]}
					>
						<FontAwesome name="bed" color={white} size={30} />
					</View>
				);
			},
		},
		eat: {
			displayName: 'Eat',
			max: 10,
			unit: 'rating',
			step: 1,
			type: 'slider',
			getIcon() {
				return (
					<View
						style={[
							styles.iconContainer,
							{ backgroundColor: pink },
						]}
					>
						<MaterialCommunityIcons
							name="food"
							color={white}
							size={35}
						/>
					</View>
				);
			},
		},
	};
	if (metric) {
		return info[metric];
	}
	return info;
}

export function isBetween(num: number, x: number, y: number): boolean {
	if (num >= x && num <= y) {
		return true;
	}

	return false;
}

export function calculateDirection(heading: number): string {
	let direction = '';

	if (isBetween(heading, 0, 22.5)) {
		direction = 'North';
	} else if (isBetween(heading, 22.5, 67.5)) {
		direction = 'North East';
	} else if (isBetween(heading, 67.5, 112.5)) {
		direction = 'East';
	} else if (isBetween(heading, 112.5, 157.5)) {
		direction = 'South East';
	} else if (isBetween(heading, 157.5, 202.5)) {
		direction = 'South';
	} else if (isBetween(heading, 202.5, 247.5)) {
		direction = 'South West';
	} else if (isBetween(heading, 247.5, 292.5)) {
		direction = 'West';
	} else if (isBetween(heading, 292.5, 337.5)) {
		direction = 'North West';
	} else if (isBetween(heading, 337.5, 360)) {
		direction = 'North';
	} else {
		direction = 'Calculating';
	}

	return direction;
}

export function timeToString(time = Date.now()): string {
	const date = new Date(time);
	const todayUTC = new Date(
		Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())
	);
	return todayUTC.toISOString().split('T')[0];
}

export function getDailyReminderValue(): { today: string } {
	return {
		today: '👋 Do not forget to log your data today!',
	};
}
