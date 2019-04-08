import React, {Component} from "react";
import {Text, TextInput, TouchableOpacity, View} from "react-native";
import styled from 'styled-components'

import {signUp} from '../services/authentication';

export default class SignOn extends Component {
	state = {
    username: undefined,
    email: undefined,
    password: undefined,
    confirmPassword: undefined,
  };

  _handleSignUp = async () => {
    const { username, email, password, confirmPassword } = this.state;
    if (!username || username === '') {
      return alert("Email can't be null!");
    }
    if (!email || email === '') {
      return alert("Email can't be null!");
    }
    if (!password || password === '') {
      return alert("Password can't be null!");
    }
    if (password !== confirmPassword) {
      return alert('Please confirm your password!');
    }

    return signUp(username, email, password)
        .then(response => this.props.navigation.navigate('Protected'))
      .catch(error => alert(error.message));
  };

	render() {
		return (
			<Container>
        <TitleStyled>Instanov</TitleStyled>

        <TextInputStyled
          placeholder="Username"
          returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({username: text})}
        />

        <TextInputStyled
          placeholder="Email"
          returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({email: text})}
        />

        <TextInputStyled
          placeholder="Password"
          textContentType="password"
          secureTextEntry={true}
          returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({password: text})}
        />

        <TextInputStyled
          placeholder="Confirm password"
          textContentType="password"
          secureTextEntry={true}
          returnKeyLabel = {"next"}
          onChangeText={(text) => this.setState({confirmPassword: text})}
        />

        <TouchableOpacityStyled
          onPress={() => this._handleSignUp()}
          title="Sign up"
        >
          <ButtonTextStyled>Sign up</ButtonTextStyled>
        </TouchableOpacityStyled>
      </Container>
		);
  }
}

const Container = styled(View)`width: 90%;text-align: center;align-self: center;background-color: #fff;border-radius: 1px;border-style: solid;border-color: #e6e6e6;border-radius: 1px;border-width: 1px;padding: 10px 0;`;

const TitleStyled = styled(Text)`font-family: BerkshireSwash;font-size: 40px;text-align: center;margin-bottom: 40px;`;

const TextInputStyled = styled(TextInput)`border-width: 1px;border-color: #e6e6e6;overflow: hidden;margin-bottom: 8px;margin-right: 40px;margin-left: 40px;padding: 9px 0 7px 8px;`;

const TouchableOpacityStyled = styled(TouchableOpacity)`background: #3897f0;border-color: #3897f0;color: #fff;border-radius: 3px;border-style: solid;border-width: 1px;font-size: 14px;font-weight: 600;line-height: 26px;overflow: hidden;flex-direction: row;justify-content: center;align-items: center;height: 30px;margin: 10px 40px 8px;`;

const ButtonTextStyled = styled(Text)`color: white;font-weight: bold;font-size: 14px;`;
