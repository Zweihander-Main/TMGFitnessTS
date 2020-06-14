import React from 'react';
import PropTypes from 'prop-types';
import { View, Platform, StatusBar } from 'react-native';
import AddEntry from '../AddEntry';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import reducer from '../../reducers';
import {
	RootState,
	RootAction,
	TabParamList,
	StackParamList,
} from '../../types';
import History from '../History';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { purple, white } from '../../utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import Constants from 'expo-constants';
import EntryDetail from '../EntryDetail';
import Live from '../Live';
import { setLocalNotification } from '../../utils/helpers';
import middleware from '../../middleware';
import { MainAppView } from './styles';

interface TMGStatusBarProps {
	backgroundColor: string;
	barStyle?: StatusBar['props']['barStyle'];
}

const TMGStatusBar: React.FC<TMGStatusBarProps> = ({
	backgroundColor,
	...props
}) => {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar
				translucent
				backgroundColor={backgroundColor}
				{...props}
			/>
		</View>
	);
};

TMGStatusBar.propTypes = {
	backgroundColor: PropTypes.string.isRequired,
	barStyle: PropTypes.oneOf(['default', 'light-content', 'dark-content']),
};

const TabNav: React.FC = () => {
	/* eslint-disable react/display-name */
	const RouteConfigs = {
		History: {
			name: 'History' as keyof TabParamList,
			component: History,
			options: {
				tabBarIcon: ({ color }: { color: string }) => (
					<Ionicons name="ios-bookmarks" size={30} color={color} />
				),
				title: 'History',
			},
		},
		AddEntry: {
			component: AddEntry,
			name: 'AddEntry' as keyof TabParamList,
			options: {
				tabBarIcon: ({ color }: { color: string }) => (
					<FontAwesome name="plus-square" size={30} color={color} />
				),
				title: 'Add Entry',
			},
		},
		Live: {
			component: Live,
			name: 'Live' as keyof TabParamList,
			options: {
				tabBarIcon: ({ color }: { color: string }) => (
					<Ionicons name="ios-speedometer" size={30} color={color} />
				),
				title: 'Live',
			},
		},
	};
	/* eslint-enable */

	const TabNavigatorConfig = {
		navigationOptions: {
			header: null,
		},
		tabBarOptions: {
			activeTintColor: Platform.OS === 'ios' ? purple : white,
			style: {
				height: 56,
				backgroundColor: Platform.OS === 'ios' ? white : purple,
				shadowColor: 'rgba(0, 0, 0, 0.24)',
				shadowOffset: {
					width: 0,
					height: 3,
				},
				shadowRadius: 6,
				shadowOpacity: 1,
			},
		},
	};

	// TypeScript bug prevents union of returnTypes for Tab
	if (Platform.OS === 'ios') {
		const Tab = createBottomTabNavigator<TabParamList>();
		return (
			<Tab.Navigator {...TabNavigatorConfig}>
				<Tab.Screen {...RouteConfigs['History']} />
				<Tab.Screen {...RouteConfigs['AddEntry']} />
				<Tab.Screen {...RouteConfigs['Live']} />
			</Tab.Navigator>
		);
	} else {
		const Tab = createMaterialTopTabNavigator<TabParamList>();
		return (
			<Tab.Navigator {...TabNavigatorConfig}>
				<Tab.Screen {...RouteConfigs['History']} />
				<Tab.Screen {...RouteConfigs['AddEntry']} />
				<Tab.Screen {...RouteConfigs['Live']} />
			</Tab.Navigator>
		);
	}
};

const MainNav: React.FC = () => {
	const SCREEN = 'screen';

	const StackNavigatorConfig = {
		headerMode: SCREEN as typeof SCREEN,
	};
	const StackConfig = {
		TabNav: {
			name: 'Home' as keyof StackParamList,
			component: TabNav,
			options: { headerShown: false },
		},
		EntryDetail: {
			name: 'EntryDetail' as keyof StackParamList,
			component: EntryDetail,
			options: {
				headerTintColor: white,
				headerStyle: {
					backgroundColor: purple,
				},
				title: 'Entry Detail',
			},
		},
	};
	const Stack = createStackNavigator<StackParamList>();
	return (
		<Stack.Navigator {...StackNavigatorConfig}>
			<Stack.Screen {...StackConfig['TabNav']} />
			<Stack.Screen {...StackConfig['EntryDetail']} />
		</Stack.Navigator>
	);
};

const store: Store<RootState, RootAction> = createStore(reducer, middleware);

const App: React.FC = () => {
	React.useEffect(() => setLocalNotification(), []);

	return (
		<Provider store={store}>
			<MainAppView>
				<TMGStatusBar
					backgroundColor={purple}
					barStyle="light-content"
				/>
				<NavigationContainer>
					<MainNav />
				</NavigationContainer>
			</MainAppView>
		</Provider>
	);
};

export default App;
