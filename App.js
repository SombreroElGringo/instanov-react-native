import React from "react";
import {StatusBar, StyleSheet, View} from "react-native";
import {Constants} from "expo";
import AppNavigator from "./navigation/AppNavigator";

export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<View style={styles.statusBar}>
					<StatusBar
						barStyle={"dark-content"}
					/>
				</View>
				<AppNavigator/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
	},
	statusBar: {
		height: Constants.statusBarHeight,
		backgroundColor: "lightgray",
	},
});
