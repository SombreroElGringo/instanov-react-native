import React from "react";
import {StyleSheet, Text, View} from "react-native";
import {Icon} from "expo";

const Logo = (props) => <Text>Instanov</Text>;

class HomeScreen extends React.Component {
	render() {
		return (
			<View>
				<View style={styles.header}>
					<View style={styles.column}>
						<Icon.Ionicons name="md-camera" style={styles.headerIcon}/>
						<Logo/>
					</View>
					<View style={styles.column}>
						<Icon.Ionicons name="md-tv" style={styles.headerIcon}/>
						<Icon.Ionicons name="md-person" style={styles.headerIcon}/>
					</View>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	header: {
		flexDirection: "row",
		justifyContent: "space-between",
		borderBottomWidth: 1,
		borderBottomColor: "lightgray"
	},
	headerIcon: {
		fontSize: 30,
		marginVertical: 5,
		marginHorizontal: 10,
	},
	column: {
		flexDirection: "row",
		alignItems: "center",
	},
});

export default HomeScreen;