import React from "react";
import {View} from "react-native";
import {Provider} from "react-redux";
import { Font } from 'expo';
import StatusBar from "./components/StatusBar";
import StackAuth from "./components/StackAuth";
import StackNavigator from "./components/StackNavigator";
import store from "./redux/store";

import { isAuth } from './services/authentication';

class App extends React.Component{
  state = {
    isAuth: undefined,
    fontLoaded: false,
  }

   async componentDidMount() {
    this.setState({
      isAuth: await isAuth(),
    })

    await this._loadAssetsAsync();
  }

  async _loadAssetsAsync(){
    try {
      await Font.loadAsync({
        'BerkshireSwash': require('./assets/fonts/BerkshireSwash-Regular.ttf'),
      });
      this.setState({fontLoaded: true})
    }
    catch(e) {
      Log.error(e);
    }
  }

	render(){
    const { isAuth, fontLoaded } = this.state;
		return <View style={{flex:1}}>
			<StatusBar/>
      { !fontLoaded
        ? null :
        isAuth === undefined
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
