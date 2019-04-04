import React from 'react';
import { FlatList } from 'react-native';

import Story from './Story';
import Footer from './Footer';

export default class StoriesList extends React.Component {
  renderStory = ({ item }) =>{
  	return <Story {...item} />;
  }
  keyExtractor = item => item.key;
  render() {
    const { onPressFooter, ...props } = this.props;
    console.log()
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        onEndReached={onPressFooter}
        onEndReachedThreshold={0}
        renderItem={this.renderStory}
        {...props}
      />
    );
  }
}
