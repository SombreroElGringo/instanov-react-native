import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {Image, View} from "react-native";
import HeaderButtons from "react-navigation-header-buttons";

import { saveAvatar } from "../services/authentication";

export default class NewAvatarScreen extends React.Component {

	static navigationOptions = ({navigation}) => ({
		title: "New Avatar",
		headerRight: (
			<HeaderButtons IconComponent={Ionicons} iconSize={23} color="black">
				<HeaderButtons.Item
					title="Save Avatar"
					onPress={() => {
						const image = navigation.getParam("image");
						if (image) {
							navigation.navigate("Profile");
							saveAvatar({image});
						} else {
							alert("Need valid image");
						}
					}}
				/>
			</HeaderButtons>
		),
	});

	render() {
		const {image} = this.props.navigation.state.params;
		return (
			<View style={{padding: 10, flexDirection: "row",  justifyContent: 'center', alignItems: 'center'}}>
				<Image
					source={{uri: image}}
					style={{resizeMode: "contain", aspectRatio: 1, width: 256}}
				/>
			</View>
		);
	}
}
