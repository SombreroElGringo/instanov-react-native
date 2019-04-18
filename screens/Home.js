import React, {Component} from "react";
import {FlatList, LayoutAnimation, RefreshControl} from "react-native";
import Post from "../components/Post";
import {connected} from "../helpers/redux";

@connected
export default class Home extends Component {
	componentDidMount() {
		const {fetchPosts} = this.props;
		fetchPosts();
	}

	render() {
		const {loading, fetchPosts, posts} = this.props;
		LayoutAnimation.easeInEaseOut();
		return <FlatList
			keyExtractor={e => e.id}
			renderItem={({item}) => <Post post={item} navigation={this.props.navigation}/>}
			data={posts}
			refreshControl={<RefreshControl refreshing={loading} onRefresh={fetchPosts}/>}
		/>;
	}
}
