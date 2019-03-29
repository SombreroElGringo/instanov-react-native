import React from 'react';
import { FlatList } from 'react-native';

import Story from './Story';
import Footer from './Footer';

export default class StoriesList extends React.Component {
  renderStory = ({ item }) => <Story {...item} />;
  keyExtractor = item => item.key;
  render() {
    const { onPressFooter, ...props } = this.props;
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
        ListFooterComponent={footerProps => (
          <Footer {...footerProps} onPress={onPressFooter} />
        )}
        renderStory={this.renderStory}
        {...props}
      />
    );
  }
}
