import React, {Component} from 'react';
import {Text, View} from 'react-native';
import styled from 'styled-components'

import SignIn from '../components/SignIn';
import SignOn from '../components/SignOn';

export default class SignScreen extends Component {
  state = {
    isSignOn: true,
  };

  _handleChangeForm = () => {
    const { isSignOn } = this.state;
    this.setState({isSignOn: !isSignOn})
  };

  render() {
    const { isSignOn } = this.state;
    return (
      <Layout>
        {
          isSignOn ? (
              <SignOn navigation={this.props.navigation}/>
          ) : (
              <SignIn navigation={this.props.navigation}/>
          )
        }

        <Container>
          <Text>
            { isSignOn ? "Do you have an account? " : "Don't have an account? " }
            <BlueTextStyled
              onPress={() => this._handleChangeForm()}
            >
              { isSignOn ? "Login to your account" :  "Sign up now" }
            </BlueTextStyled>
          </Text>
        </Container>

      </Layout>
    );
  }
}

const Layout = styled(View)`flex: 1;justify-content: center;`;

const Container = styled(View)`width: 90%;text-align: center;align-self: center;background-color: #fff;border-radius: 1px;border-style: solid;border-color: #e6e6e6;border-radius: 1px;border-width: 1px;padding: 10px 10px;margin-top: 20px;`;

const BlueTextStyled = styled(Text)`color: #3897f0;font-weight: bold;`;
