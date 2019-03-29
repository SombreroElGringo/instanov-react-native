import React, { Component } from 'react';
import { LayoutAnimation, RefreshControl } from 'react-native';

import StoriesList from '../components/StoriesList';
import { isAuth } from '../services/authentication';
import { getStoriesByPagination } from '../services/story';

// Set the default number of images to load for each pagination.
const PAGE_SIZE = 5;

export default class StoriesFlowScreen extends Component {
  state = {
    loading: false,
    posts: [],
    data: {},
  };

  componentDidMount() {
    if (true /*isAuth*/) { // TODO: edit when auth implemented
      // If we are auth, then we can get the first 5 stories
      this.makeRemoteRequest();
    }
  }

  // Append the item to our states `data` prop
  addPosts = posts => {
    this.setState(previousState => {
      let data = {
        ...previousState.data,
        ...posts,
      };
      return {
        data,
        // Sort the data by timestamp
        posts: Object.values(data).sort((a, b) => a.timestamp < b.timestamp),
      };
    });
  };

  // Call our database and ask for a subset of the user posts
  makeRemoteRequest = async lastKey => {
    if (this.state.loading) {
      return;
    }
    this.setState({ loading: true });

    // The data prop will be an array of posts, the cursor will be used for pagination.
    const { data, cursor } = await getStoriesByPagination({
      size: PAGE_SIZE,
      start: lastKey,
    });

    this.lastKnownKey = cursor;
    // Iteratively add posts
    let posts = {};
    for (let child of data) {
      posts[child.key] = child;
    }
    this.addPosts(posts);

    // Finish loading, this will stop the refreshing animation.
    this.setState({ loading: false });
  };

  // This will make the data base pull the most recent items.
  _onRefresh = () => this.makeRemoteRequest();

  // If we press the "Load More..." footer then get the next page of posts
  onPressFooter = () => this.makeRemoteRequest(this.lastKnownKey);

  render() {
    LayoutAnimation.easeInEaseOut();
    return (
      <StoriesList
        refreshControl={
          <RefreshControl
            refreshing={this.state.loading}
            onRefresh={this._onRefresh}
          />
        }
        onPressFooter={this.onPressFooter}
        data={this.state.posts}
      />
    );
  }
}
