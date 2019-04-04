import {createBottomTabNavigator, createStackNavigator} from "react-navigation";

import TabBarIcon from "../components/TabBarIcon";
import NewStoryScreen from "../screens/NewStoryScreen";
import SelectImageScreen from "../screens/SelectImageScreen";

import Home from "../screens/Home";

const Navigator = createBottomTabNavigator(
	{
		Feed: {
			screen: Home,
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
		Main:  Navigator,
		NewStory: NewStoryScreen,
	},
	{
		cardStyle: { backgroundColor: 'white' },
		navigationOptions: { title: 'Instanov 🔥' },
	},
);

export default StackNavigator;
