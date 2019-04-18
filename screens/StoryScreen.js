import React, {Component} from "react";
import {LayoutAnimation, ScrollView, Text} from "react-native";
import Post from "../components/Post";
import {Firestore} from "../helpers/firebase";

export default class StoryScreen extends Component {
	state = {post: undefined};

	componentDidMount() {
		const {navigation} = this.props;
		const docId        = navigation.getParam("docId", null);
		this.fetchPostByDocId(docId);
	}

	fetchPostByDocId = async (docId) => {
		Firestore
			.collection("stories")
			.doc(docId).onSnapshot(document => {
			this.setState({post: {...document.data(), id: docId}});
		});
	};

	render() {
		const {post} = this.state;
		LayoutAnimation.easeInEaseOut();
		return <ScrollView>
			{post && <Post post={post} detailed/>}
			<Text style={{height: 40}}/>
		</ScrollView>;
	}
}
