import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { white } from './utils/colors';

const App: React.FC = () => {
	return (
		<View style={styles.container}>
			<Text>Open up App.tsx to start working on your app!</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		backgroundColor: white,
		flex: 1,
		justifyContent: 'center',
	},
});

export default App;
