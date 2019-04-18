import React, {Component} from "react";
import {FlatList, LayoutAnimation, RefreshControl} from "react-native";
import {Firestore} from "../helpers/firebase";
import Post from "../components/Post";

export default class StoryScreen extends Component {
  state = {post: undefined}
	componentDidMount() {
    const { navigation} = this.props;
    const docId = navigation.getParam('docId', null);
		this.fetchPostByDocId(docId)
  }

  fetchPostByDocId = async (docId) => {
		Firestore
		.collection("stories")
    .doc(docId).onSnapshot(document => {
      this.setState({ post: {...document.data(), id: docId}});
      });
    }

	render() {
    const {post} = this.state;
    LayoutAnimation.easeInEaseOut();
		return (
			post ? <Post post={post}/> : null
		);
	}
}
