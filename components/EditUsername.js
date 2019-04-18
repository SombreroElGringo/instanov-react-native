import * as PropTypes from "prop-types";
import React, {Component} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styled from "styled-components";

export default class EditUsername extends Component {
	render() {
		return <>
			{this.props.editUsername ?
				(
					<View>
						<TextInput
							placeholder={this.props.user.displayName}
							returnKeyLabel={"next"}
							autoCapitalize="none"
							onChangeText={this.props.onChangeText}
						/>
						<View style={{flexDirection: "row"}}>
							<TouchableOpacity onPress={this.props.onPress}>
								<Icon name="window-close"/>
							</TouchableOpacity>
							<TouchableOpacity onPress={this.props.onPress1}>
								<Icon name="check-square"/>
							</TouchableOpacity>
						</View>
					</View>
				) : (
					<View>
						<Text>{this.props.user.displayName}</Text>
						<TouchableOpacity onPress={this.props.onPress}>
							<Icon name="edit"/>
						</TouchableOpacity>
					</View>
				)
			}
		</>;
	}
}

EditUsername.propTypes = {
	editUsername: PropTypes.bool,
	user: PropTypes.any,
	onChangeText: PropTypes.func,
	onPress: PropTypes.func,
	onPress1: PropTypes.func,
};

const Icon = styled(FontAwesome)`font-size: 20px; padding: 5px;`;
