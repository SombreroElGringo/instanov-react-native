import moment from "moment";
import "moment/locale/fr";
import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styled from "styled-components";
import {connected} from "../helpers/redux";
import {getDeviceName, getWidth} from "../helpers/userDeviceInfo";

@connected
export default class Post extends React.PureComponent {
	render() {
		const {post, likePost}                               = this.props;
		const {image, user, text, likes = [], id, timestamp} = post;

		return <View>
			<Grid>
				<Row>
					<Avatar source={{uri: image}}/>
					<Name>{user.deviceName}</Name>
				</Row>
				<Row>
					<Icon name="ellipsis-v"/>
				</Row>
			</Grid>
			<Picture source={{uri: image}}/>
			<Actions>
				<Row>
					<TouchableOpacity onPress={() => likePost(id)}>
						<Icon name={likes.includes(getDeviceName()) ? "heart" : "heart-o"}/>
					</TouchableOpacity>
					<Icon name="comment-o"/>
					<Icon name="send-o"/>
				</Row>
				<Row>
					<Icon name="bookmark-o"/>
				</Row>
			</Actions>
			{likes.length > 0 && <Likes>{likes.length} like{likes.length > 1 ? "s" : ""}</Likes>}
			<Description>
				<Text>
					<Name>{user.deviceName} </Name>
					<Text>{text}</Text>
				</Text>
			</Description>
			<Date>{moment().to(timestamp)}</Date>
		</View>;
	}
}

const Grid        = styled(View)`flex-direction: row; justify-content: space-between; align-items: center;`;
const Actions     = styled(View)`flex-direction: row; justify-content: space-between; align-items: center;`;
const Row         = styled(View)`flex-direction: row; align-items: center;padding: 5px;`;
const Description = styled(View)`padding: 0 10px;margin-bottom: 5px`;
const Likes       = styled(Text)`padding: 0 10px 5px;font-weight: bold;`;
const Avatar      = styled(Image)` width: 30px; height: 30px; border-radius: 15px; margin: 5px;background-color: whitesmoke; `;
const Name        = styled(Text)`font-weight: bold; padding: 5px;`;
const Date        = styled(Text)`padding: 0 10px;margin-bottom: 10px;color: grey;font-size: 12px`;
const Icon        = styled(FontAwesome)`font-size: 20px; padding: 5px; color: ${props => props.name === 'heart' ? 'red' : 'black'}`;
const Picture     = styled(Image)`width:${getWidth()};height: ${getWidth()}; background-color: whitesmoke`;