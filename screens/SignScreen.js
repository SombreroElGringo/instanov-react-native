import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import SignIn from '../components/SignIn';
import SignOn from '../components/SignOn';

export default class SignScreen extends Component {
  state = {
    isSignOn: true,
  };

  _handleChangeForm = () => {
    const { isSignOn } = this.state;
    this.setState({isSignOn: !isSignOn})
  }

  render() {
    const { isSignOn } = this.state;
    return (
      <View style={styles.container}>
        {
          isSignOn ? (
            <SignOn />
          ) : (
            <SignIn />
          )
        }

        <View>
          <Text>
            { isSignOn ? "Don't have an account? " : "Do you have an account? "}
            <Text
              onPress={() => this._handleChangeForm()}
            >
              { isSignOn ? "Sign up now" : "Login to your account"}
            </Text>
          </Text>
        </View>

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
