import moment from "moment";
import React from "react";
import {FlatList, Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import styled from "styled-components";
import {Row} from "../helpers/styledComponents";

export default class CommentsScreen extends React.Component {
	render() {
		const {navigation} = this.props;
		const {comments}   = navigation.state.params;
		return <SView>
			<SRow>
				<CommentInput
					onSubmitEditing={this.handleAddComment}
					returnKeyType="send"
					ref={c => this.commentInput = c}
					placeholder={"Ajouter un commentaire..."}
				/>
				<TouchableOpacity onPress={this.handleAddComment}>
					<PublishButton>Publier</PublishButton>
				</TouchableOpacity>
			</SRow>
			<SFlatList
				data={comments.sort((a,b) => b.timestamp - a.timestamp)} keyExtractor={item => item.timestamp.toString()} renderItem={({item}) => <View>
				<Row>
					<SImage source={{uri: item.avatar}}/>
					<SText>{item.comment}</SText>
				</Row>
				<View>
					<TText>{moment(item.timestamp).fromNow()}</TText>
				</View>
			</View>}
			/>
		</SView>;
	}

	handleAddComment = () => {
		const {sendComment, postId} = this.props.navigation.state.params;
		sendComment(postId, this.commentInput._lastNativeText);
		this.commentInput.clear();
	};
}

const SFlatList     = styled(FlatList)`flex:1; padding-top: 10px`;
const SView         = styled(View)`flex:1`;
const SRow          = styled(Row)`padding: 10px;border-top-width: 1px; border-top-color: lightgrey;background-color: white;`;
const SImage        = styled(Image)`height: 32px; width:32px; margin: 0 10px; border-radius: 20px; background-color: lightgrey; align-self: flex-start`;
const SText         = styled(Text)`font-size: 13px; flex:1;`;
const TText         = styled(Text)`font-size: 11px; font-style: italic; color: grey;margin: 5px 10px 10px`;
const CommentInput  = styled(TextInput)`flex:1`;
const PublishButton = styled(Text)`color: teal`;
