import React from 'react';
import {
	View,
	Text,
	ActivityIndicator,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { purple, white, transparentWhite } from '../utils/colors';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { calculateDirection } from '../utils/helpers';

type coords = {
	latitude: number;
	longitude: number;
	altitude: number;
	accuracy: number;
	heading: number;
	speed: number;
};

type permissionStatus = 'granted' | 'undetermined' | 'denied';

const Live: React.FC = () => {
	const [coords, setCoords] = React.useState<coords | null>(null);
	const [status, setStatus] = React.useState<permissionStatus | null>(null);
	const [direction, setDirection] = React.useState('');

	const setLocation = () => {
		void Location.watchPositionAsync(
			{
				enableHighAccuracy: true,
				timeInterval: 1,
				distanceInterval: 1,
			},
			({ coords }) => {
				const newDirection = calculateDirection(coords.heading);
				setCoords(coords);
				setStatus('granted');
				setDirection(newDirection);
			}
		);
	};

	const askPermission = () => {
		Permissions.askAsync(Permissions.LOCATION)
			.then(({ status }) => {
				if (status === 'granted') {
					return setLocation();
				}
				setStatus(status);
			})
			.catch((error) =>
				console.warn('error asking Location permission: ', error)
			);
	};

	/* eslint-disable react-hooks/exhaustive-deps */
	React.useEffect(() => {
		askPermission();
	}, []);
	/* eslint-enable */

	if (status === null) {
		return <ActivityIndicator style={styles.nullStatus} />;
	}

	if (status === 'denied') {
		return (
			<View style={styles.center}>
				<Foundation name="alert" size={50} />
				<Text>
					You denied your location. You can fix this by visiting your
					settings and enabling location services for this app.
				</Text>
			</View>
		);
	}

	if (status === 'undetermined') {
		return (
			<View style={styles.center}>
				<Foundation name="alert" size={50} />
				<Text>You need to enable location services for this app.</Text>
				<TouchableOpacity style={styles.button} onPress={askPermission}>
					<Text style={styles.buttonText}>Enable</Text>
				</TouchableOpacity>
			</View>
		);
	}

	return (
		<View style={styles.container}>
			<View style={styles.directionContainer}>
				<Text style={styles.header}>You&apos;re heading</Text>
				<Text style={styles.direction}>{direction}</Text>
			</View>
			{coords !== null && (
				<View style={styles.metricContainer}>
					<View style={styles.metric}>
						<Text style={[styles.header, { color: white }]}>
							Altitude
						</Text>
						<Text style={[styles.subHeader, { color: white }]}>
							{Math.round(coords.altitude * 3.2808)} Feet
						</Text>
					</View>
					<View style={styles.metric}>
						<Text style={[styles.header, { color: white }]}>
							Speed
						</Text>
						<Text style={[styles.subHeader, { color: white }]}>
							{(coords.speed * 2.2369).toFixed(1)} MPH
						</Text>
					</View>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	button: {
		alignSelf: 'center',
		backgroundColor: purple,
		borderRadius: 5,
		margin: 20,
		padding: 10,
	},
	buttonText: {
		color: white,
		fontSize: 20,
	},
	center: {
		alignItems: 'center',
		flex: 1,
		justifyContent: 'center',
		marginLeft: 30,
		marginRight: 30,
	},
	container: {
		flex: 1,
		justifyContent: 'space-between',
	},
	direction: {
		color: purple,
		fontSize: 120,
		textAlign: 'center',
	},
	directionContainer: {
		flex: 1,
		justifyContent: 'center',
	},
	header: {
		fontSize: 35,
		textAlign: 'center',
	},
	metric: {
		backgroundColor: transparentWhite,
		flex: 1,
		marginBottom: 20,
		marginLeft: 10,
		marginRight: 10,
		marginTop: 20,
		paddingBottom: 15,
		paddingTop: 15,
	},
	metricContainer: {
		backgroundColor: purple,
		flexDirection: 'row',
		justifyContent: 'space-around',
	},
	nullStatus: { marginTop: 30 },
	subHeader: {
		fontSize: 25,
		marginTop: 5,
		textAlign: 'center',
	},
});

export default Live;
