import React from "react";
import {TouchableOpacity} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import {createBottomTabNavigator, createNavigationContainer, createStackNavigator, createSwitchNavigator} from "react-navigation";
import TabBarIcon from "../components/TabBarIcon";
import CommentsScreen from "../screens/CommentsScreen";
import Home from "../screens/Home";
import NewAvatarScreen from "../screens/NewAvatarScreen";
import NewStoryScreen from "../screens/NewStoryScreen";
import Profile from "../screens/Profile";
import SelectAvatarScreen from "../screens/SelectAvatarScreen";
import SelectImageScreen from "../screens/SelectImageScreen";
import SignScreen from "../screens/SignScreen";
import StoryScreen from "../screens/StoryScreen";
import {isAuth, signOut} from "../services/authentication";

const Navigator = createBottomTabNavigator(
	{
		Home: {
			screen: Home,
			navigationOptions: {
				tabBarIcon: TabBarIcon("home"),
			},
		},
		Image: {
			screen: SelectImageScreen,
			navigationOptions: {
				tabBarIcon: TabBarIcon("add-circle"),
			},
		},
		Profile: {
			screen: Profile,
			navigationOptions: {
				tabBarIcon: TabBarIcon("account-circle"),
			},
		},
	},
	{
		initialRouteName: "Home",
		tabBarOptions: {
			showLabel: false,
			activeTintColor: "black",
			inactiveTintColor: "gray",
		},
	},
);

const StackNavigator = createStackNavigator(
	{
		Main: Navigator,
		NewStory: NewStoryScreen,
		SelectAvatar: SelectAvatarScreen,
		NewAvatar: NewAvatarScreen,
		Story: StoryScreen,
		Comments: CommentsScreen
	},
	{
		cardStyle: {backgroundColor: "white"},
		navigationOptions: ({navigation}) => ({
			title: "Instanov 🔥",
			headerRight: <TouchableOpacity onPress={() => {
				signOut().finally(() => navigation.navigate("Login"));
			}}><FontAwesome style={{padding: 5}} size={20} name="sign-out"/></TouchableOpacity>,
		}),
	},
);

const StackAuth = createStackNavigator(
	{
		SignForm: SignScreen,
	}, {
		headerMode: "none",
	},
);

class CheckAuth extends React.Component {
	async checkAuth() {
		this.props.navigation.navigate(await isAuth() ? "Protected" : "Login");
	}

	componentDidMount() {
		this.checkAuth().catch(console.error);
	}

	render() {
		return null;
	}
}

export default createNavigationContainer(createSwitchNavigator({
	CheckAuth,
	Login: StackAuth,
	Protected: StackNavigator,
}));
