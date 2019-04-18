import React from "react";
import {Image} from "react-native";
import {getWidth} from "../helpers/userDeviceInfo";

export default class Thumbnail extends React.PureComponent {
	render() {
		const {perRow = 3} = this.props;
		return <Image source={{uri: this.props.image, width: getWidth() / perRow, height: getWidth() / perRow}}
		              style={{borderWidth: 3, borderColor: "white"}}
		/>;
	}
}