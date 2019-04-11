import moment from "moment";
import "moment/locale/fr";
import React from "react";
import {Image, Text, TouchableOpacity, TouchableWithoutFeedback, View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styled from "styled-components";
import {Authentication} from "../helpers/firebase";
import {connected} from "../helpers/redux";
import {getWidth} from "../helpers/userDeviceInfo";
import ImageView from "react-native-image-view";

@connected
export default class Post extends React.PureComponent {
	state={visible: false,};
	render() {
		const {post, likePost}                                                        = this.props;
		const {image, user, text, likes = [], id, timestamp, imageHeight, imageWidth} = post;
		const currentUsername                                                         = Authentication.currentUser.displayName;
		if (!currentUsername) return null;

		return <View>
			<Grid>
				<Row>
					<Avatar source={{uri: user.avatarUrl || image}}/>
					<Name>{user.username}</Name>
				</Row>
				<Row>
					<Icon name="ellipsis-v"/>
				</Row>
			</Grid>
			<TouchableWithoutFeedback onPress={() => this.setState({visible: true})}>
				<Picture source={{uri: image}}/>
			</TouchableWithoutFeedback>
			<ImageView isVisible={this.state.visible}
			           animationType="fade"
			           onClose={() => this.setState({visible: false})}
			           images={[
				           {
					           source: {uri: image},
					           width: imageWidth,
					           height: imageHeight,
				           },
			           ]}
			/>
			<Actions>
				<Row>
					<TouchableOpacity onPress={() => likePost(id)}>
						<Icon name={likes.includes(currentUsername) ? "heart" : "heart-o"}/>
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
					<Name>{user.username} </Name>
					<Text>{text}</Text>
				</Text>
			</Description>
			<Date>{moment().to(timestamp)}</Date>
		</View>;
	}
}

const Actions     = styled(View)` flex-direction: row; justify-content: space-between; align-items: center;`;
const Avatar      = styled(Image)` width: 30px; height: 30px; border-radius: 15px; margin: 5px;background-color: whitesmoke; `;
const Date        = styled(Text)`padding: 0 10px;margin-bottom: 10px;color: grey;font-size: 12px`;
const Description = styled(View)`padding: 0 10px;margin-bottom: 5px`;
const Grid        = styled(View)`flex-direction: row; justify-content: space-between; align-items: center;`;
const Icon        = styled(FontAwesome)`font-size: 20px; padding: 5px; color: ${props => props.name === "heart"
	? "red"
	: "black"}`;
const Likes       = styled(Text)`padding: 0 10px 5px;font-weight: bold;`;
const Name        = styled(Text)`font-weight: bold; padding: 5px;`;
const Picture     = styled(Image)`width:${getWidth()};height: ${getWidth()}; background-color: whitesmoke`;
const Row         = styled(View)`flex-direction: row; align-items: center;padding: 5px;`;
