import React from "react";
import {View} from "react-native";
import StatusBar from "./components/StatusBar";
import StackNavigator from "./components/StackNavigator";

export default class App extends React.Component{
	render(){
		return <View style={{flex:1}}>
			<StatusBar/>
			<StackNavigator/>
		</View>
	}
};
