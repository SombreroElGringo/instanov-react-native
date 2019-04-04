import {Ionicons} from "@expo/vector-icons";
import React from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {getDeviceName, getWidth} from "../helpers/userDeviceInfo";
import {likeStory} from "../services/story";

const PROFILE_IMAGE_SIZE = 36;
const PADDING            = 12;

export default class Story extends React.Component {
	state = {};

	componentDidMount() {
		this.setState({names: this.props.names})
		if (!this.props.imageWidth) {
			// Get the size of the web image
			Image.getSize(this.props.image, (width, height) => {
				this.setState({width, height});
			});
		}
	}

	render() {
		const {text, name, imageWidth, imageHeight, uid, image } = this.props;
		const {names = []} = this.state;

		// Reduce the name to something
		const imgW   = imageWidth || this.state.width;
		const imgH   = imageHeight || this.state.height;
		const aspect = imgW / imgH || 1;

		return (
			<View>
				<Header image={{uri: image}} name={name}/>
				<Image
					resizeMode="cover"
					style={{
						backgroundColor: "#D8D8D8",
						width: getWidth(),
						height: getWidth(),
					}}
					source={{uri: image}}
				/>
				<Metadata name={name} description={text} liked={names.includes(getDeviceName())} like={this.like}/>
			</View>
		);
	}

	like = () => {
		let { docId} = this.props;
		let {names = []} = this.state;
		if (names.includes(getDeviceName())) {
			names = names.filter(a => a !== getDeviceName())
		}else{
			names.push(getDeviceName());
		}
		likeStory(docId, names)
		this.setState({names})
	};
}

const Metadata = ({name, description, like, liked}) => (
	<View style={styles.padding}>
		<IconBar liked={liked} like={like}/>
		<Text style={styles.text}>{name}</Text>
		<Text style={styles.subtitle}>{description}</Text>
	</View>
);

const Header = ({name, image}) => (
	<View style={[styles.row, styles.padding]}>
		<View style={styles.row}>
			<Image style={styles.avatar} source={image}/>
			<Text style={styles.text}>{name}</Text>
		</View>
		<Icon name="ios-more"/>
	</View>
);

const Icon = ({name}) => (
	<Ionicons style={{marginRight: 8}} name={name} size={26} color="black"/>
);

const IconBar = ({like, liked}) => (
	<View style={styles.row}>
		<View style={styles.row}>
			<LikeButton liked={liked} like={like}/>
			<Icon name="ios-chatbubbles"/>
			<Icon name="ios-send"/>
		</View>
		<Icon name="ios-bookmark"/>
	</View>
);

class LikeButton extends React.PureComponent {
	render() {
		return <TouchableOpacity onPress={this.props.like}>
			<Icon name={this.props.liked ? "ios-heart" : "ios-heart-empty"}/>
		</TouchableOpacity>;
	}

}

const styles = StyleSheet.create({
	text: {fontWeight: "600"},
	subtitle: {
		opacity: 0.8,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	padding: {
		padding: PADDING,
	},
	avatar: {
		aspectRatio: 1,
		backgroundColor: "#D8D8D8",
		borderWidth: StyleSheet.hairlineWidth,
		borderColor: "#979797",
		borderRadius: PROFILE_IMAGE_SIZE / 2,
		width: PROFILE_IMAGE_SIZE,
		height: PROFILE_IMAGE_SIZE,
		resizeMode: "cover",
		marginRight: PADDING,
	},
});
