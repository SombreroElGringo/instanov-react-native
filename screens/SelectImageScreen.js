import { ImagePicker, Permissions } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getPermission } from '../helpers/permission';

const options = {
  allowsEditing: true,
};

export default class SelectImageScreen extends Component {
  state = {};

  _selectImage = async () => {
    const status = await getPermission(Permissions.CAMERA_ROLL);
    if (status) {
      const result = await ImagePicker.launchImageLibraryAsync(options);
      if (!result.cancelled) {
        this.props.navigation.navigate('NewStory', { image: result.uri });
      }
    }
  };

  _takePhoto = async () => {
    const status = await getPermission(Permissions.CAMERA_ROLL);
    if (status) {
      const result = await ImagePicker.launchCameraAsync(options);
      if (!result.cancelled) {
        this.props.navigation.navigate('NewStory', { image: result.uri });
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Text onPress={this._selectImage} style={styles.text}>
          Select Image
        </Text>
        <Text onPress={this._takePhoto} style={styles.text}>
          Take Photo
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    padding: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
