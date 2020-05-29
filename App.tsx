import React from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
// import AddEntry from './components/AddEntry';
import { createStore, Store } from 'redux';
import { Provider } from 'react-redux';
import reducer from './reducers';
import { RootState } from './types';
import History from './components/History';
import { TabNavigator, StackNavigator } from 'react-navigation';
import { purple, white } from './utils/colors';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';

function StatusBar({ backgroundColor, ...props }) {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar
				translucent
				backgroundColor={backgroundColor}
				{...props}
			/>
		</View>
	);
}
const MainNavigator = StackNavigator({
	Home: {
		screen: Tabs,
	},
	EntryDetail: {
		screen: EntryDetail,
		navigationOptions: {
			headerTintColor: white,
			headerStyle: {
				backgroundColor: purple,
			},
		},
	},
});
const styles = StyleSheet.create({
	mainAppView: {
		flex: 1,
	},
});

const store: Store<RootState> = createStore(reducer);

const App: React.FC = () => {
	return (
		<Provider store={store}>
			<View style={styles.mainAppView}>
				<StatusBar backgroundColor={purple} barStyle="light-content" />
				<Tabs />
			</View>
		</Provider>
	);
};

export default App;
