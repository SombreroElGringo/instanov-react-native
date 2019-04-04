import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import styled from 'styled-components/native'

import { signIn } from '../services/authentication';

export default class SignIn extends Component {
	state = {
    email: undefined,
    password: undefined,
  };

  _handleLogin = async () => {
    const { email, password } = this.state;

    if (!email || email === '') {
      return alert("Email can't be null!");
    }
    if (!password || password === '') {
      return alert("Password can't be null!");
    }

    return signIn(email, password);
  }

	render() {
		return (
			<View>
        <Text>Instanov</Text>

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

        <Button
          onPress={() => this._handleLogin()}
          title="Login"
        />
      </View>
		);
  }
}

const ContainerStyled = styled(View)`
    width: 100%;
    text-align: center;
    background-color: #fff;
    border-width: 1px;
    border-color: #e6e6e6;
    border-radius: 1px;
    margin: 0 0 10px;
    padding: 10px 0;
`;
