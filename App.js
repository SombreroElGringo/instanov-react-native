import React from "react";
import {View} from "react-native";
import {Provider} from "react-redux";
import StatusBar from "./components/StatusBar";
import StackAuth from "./components/StackAuth";
import StackNavigator from "./components/StackNavigator";
import store from "./redux/store";

import { isAuth } from './services/authentication';

export default class App extends React.Component{
  state = {
    isAuth: undefined,
  }

  async componentDidMount() {
    this.setState({
      isAuth: await isAuth(),
    })
  }

	render(){
    const { isAuth } = this.state;
		return <View style={{flex:1}}>
			<StatusBar/>
      { isAuth === undefined
        ? null
        : isAuth === false
          ? <StackAuth/>
          : <StackNavigator/>
      }
		</View>
	}
}

export default () => <Provider store={store}>
	<App/>
</Provider>