import React, { Component } from "react";
import { View, Text, TextInput, Button } from "react-native";
import styled from 'styled-components'

import { signIn } from '../services/authentication';

export default class SignIn extends Component {
	state = {
    email: undefined,
    password: undefined,
  };

  _handleLogin = () => {
    const { email, password } = this.state;

    if (!email || email === '') {
      return alert("Email can't be null!");
    }
    if (!password || password === '') {
      return alert("Password can't be null!");
    }

    return signIn(email, password)
      .then(response => response)
      .catch(error => alert(error.message));
  }

	render() {
		return (
			<View>

        <TitleStyled>Instanov</TitleStyled>

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

        <ButtonStyled
          onPress={() => this._handleLogin()}
          title="Login"
        />
      </View>
		);
  }
}

const TitleStyled = styled(Text)`font-size: 40px;`;

const ButtonStyled = styled(Button)`background-color: #3897f0;`;
