import React from "react";
import {createBottomTabNavigator, createStackNavigator} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import NewStoryScreen from "../screens/NewStoryScreen";
import SelectImageScreen from "../screens/SelectImageScreen";

import StoriesFlowScreen from "../screens/StoriesFlowScreen";

const Navigator = createBottomTabNavigator(
	{
		Feed: {
			screen: StoriesFlowScreen,
			navigationOptions: {
				tabBarIcon: TabBarIcon('home'),
			},
		},
		Image: {
			screen: SelectImageScreen,
			navigationOptions: {
				tabBarIcon: TabBarIcon('add-circle'),
			},
		},
	},
	{
		tabBarOptions: {
			showLabel: false,
			activeTintColor: 'black',
			inactiveTintColor: 'gray',
		},
	},
);

const StackNavigator = createStackNavigator(
	{
		Main: {
			screen: Navigator,
			navigationOptions: { title: 'Instanov 🔥' },
		},
		NewStory: NewStoryScreen,
	},
	{
		cardStyle: { backgroundColor: 'white' },

	},
);

export default StackNavigator