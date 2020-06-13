import React from 'react';
import { Text } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { calculateDirection } from '../../utils/helpers';
import {
	NullActivityIndicator,
	InfoCenteredView,
	AskPermissionText,
	AskPermissionTouchableOpacity,
	LiveContainerView,
	DirectionContainerView,
	DirectionText,
	HeaderText,
	HeaderWhiteText,
	MetricContainerView,
	MetricView,
	SubHeaderText,
} from './styles';

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
		return <NullActivityIndicator />;
	}

	if (status === 'denied') {
		return (
			<InfoCenteredView>
				<Foundation name="alert" size={50} />
				<Text>
					You denied your location. You can fix this by visiting your
					settings and enabling location services for this app.
				</Text>
			</InfoCenteredView>
		);
	}

	if (status === 'undetermined') {
		return (
			<InfoCenteredView>
				<Foundation name="alert" size={50} />
				<Text>You need to enable location services for this app.</Text>
				<AskPermissionTouchableOpacity onPress={askPermission}>
					<AskPermissionText>Enable</AskPermissionText>
				</AskPermissionTouchableOpacity>
			</InfoCenteredView>
		);
	}

	return (
		<LiveContainerView>
			<DirectionContainerView>
				<HeaderText>You&apos;re heading</HeaderText>
				<DirectionText>{direction}</DirectionText>
			</DirectionContainerView>
			{coords !== null && (
				<MetricContainerView>
					<MetricView>
						<HeaderWhiteText>Altitude</HeaderWhiteText>
						<SubHeaderText>
							{Math.round(coords.altitude * 3.2808)} Feet
						</SubHeaderText>
					</MetricView>
					<MetricView>
						<HeaderWhiteText>Speed</HeaderWhiteText>
						<SubHeaderText>
							{(coords.speed * 2.2369).toFixed(1)} MPH
						</SubHeaderText>
					</MetricView>
				</MetricContainerView>
			)}
		</LiveContainerView>
	);
};

export default Live;
