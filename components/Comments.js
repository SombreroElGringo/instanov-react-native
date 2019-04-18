import * as PropTypes from "prop-types";
import React from "react";
import {Image, Text, TextInput, TouchableOpacity, View} from "react-native";
import styled from "styled-components";
import {Authentication} from "../helpers/firebase";
import {Row} from "../helpers/styledComponents";

export default class Comments extends React.Component {
	state = {edit: false};

	render() {
		const {comments = []} = this.props;
		const {edit}          = this.state;

		return <CommentsWrapper behavior={"position"}>
			{comments.length > 0 && <TouchableOpacity onPress={this.openComments}>
				<CommentsMessage>Voir les {comments.length} commentaires</CommentsMessage>
			</TouchableOpacity>}
			<Row style={{marginBottom: 5}}>
				<Avatar source={{uri: Authentication.currentUser.photoURL}}/>
				{!edit && <TouchableOpacity onPress={this.edit}>
					<AddComment>Ajouter un commentaire...</AddComment>
				</TouchableOpacity>}
				{edit && <CommentInput onSubmitEditing={this.handleAddComment} returnKeyType="send" ref={c => this.commentInput = c} autoFocus placeholder={"Ajouter un commentaire..."}/>}
				{edit && <TouchableOpacity onPress={this.handleAddComment}>
					<PublishButton>Publier</PublishButton>
				</TouchableOpacity>}
			</Row>
		</CommentsWrapper>;
	}

	edit = () => {
		this.setState({edit: true});
	};

	handleAddComment = () => {
		const {sendComment, postId} = this.props;
		this.setState({edit: false});
		sendComment(postId, this.commentInput._lastNativeText);
	};

	openComments = () => {

	};
}

Comments.propTypes = {
	comments: PropTypes.array,
	postId: PropTypes.string,
	sendComment: PropTypes.func,
};

const CommentsWrapper = styled(View)`padding: 0 10px;`;
const CommentsMessage = styled(Text)`color: grey; margin-bottom:  5px`;
const AddComment      = styled(Text)`color: grey;`;
const CommentInput    = styled(TextInput)`flex:1`;
const PublishButton   = styled(Text)`color: teal`;
const Avatar          = styled(Image)`width: 24px; height: 24px; border-radius: 12px; margin-right: 10px`;