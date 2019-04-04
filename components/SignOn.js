import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import styled from 'styled-components/native'

import { signUp } from '../services/authentication';

export default class SignOn extends Component {
	state = {
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  };

  _handleSignUp = async () => {
    const { email, password, confirmPassword } = this.state;

    if (!email || email === '') {
      return alert("Email can't be null!");
    }
    if (!password || password === '') {
      return alert("Password can't be null!");
    }
    if (password !== confirmPassword) {
      return alert('Please confirm your password!');
    }

    return signUp(email, password)
      .then(response => response)
      .catch(error => alert(error.message));
  }

	render() {
		return (
			<View>
        <Text>
          <TitleStyled>Instanov</TitleStyled>
        </Text>

        <TextInput
          placeholder="Email"
          returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({email: text})}
        />

        <TextInput
          placeholder="Password"
          textContentType="password"
          secureTextEntry={true}
          returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({password: text})}
        />

        <TextInput
          placeholder="Confirm password"
          textContentType="password"
          secureTextEntry={true}
          returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({confirmPassword: text})}
        />

        <Button
          onPress={() => this._handleSignUp()}
          title="Sign up"
        />
      </View>
		);
  }
}

const TitleStyled = styled(Text)`font-size: 40px;`;
