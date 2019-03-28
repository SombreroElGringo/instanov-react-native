import React from "react";
import {createBottomTabNavigator, createStackNavigator} from "react-navigation";
import HomeScreen from "../screens/HomeScreen";
import TabBarIcon from "../components/TabBarIcon";

const HomeStack = createStackNavigator({
	Home: HomeScreen,
}, {
	headerMode: 'none',
	navigationOptions: {
		headerVisible: false,
		tabBarIcon: (props) => <TabBarIcon {...props} name="md-home"/>

	}
});

export default createBottomTabNavigator({
	HomeStack,
},{
	tabBarOptions: {
		showLabel:false,
		showIcon: true,
	}
});
