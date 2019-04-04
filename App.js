import React from "react";
import {View} from "react-native";
import {Provider} from "react-redux";
import StatusBar from "./components/StatusBar";
import StackNavigator from "./components/StackNavigator";
import store from "./redux/store";

class App extends React.Component{
	render(){
		return <View style={{flex:1}}>
			<StatusBar/>
			<StackNavigator/>
		</View>
	}
}

export default () => <Provider store={store}>
	<App/>
</Provider>