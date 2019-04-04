import React from "react";
import {View} from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';
import StatusBar from "./components/StatusBar";

import TabBarIcon from './components/TabBarIcon';

import StoriesFlowScreen from './screens/StoriesFlowScreen';
import NewStoryScreen from './screens/NewStoryScreen';
import SelectImageScreen from './screens/SelectImageScreen';

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

export default class App extends React.Component{
	render(){
		return <View style={{flex:1}}>
			<StatusBar/>
			<StackNavigator/>
		</View>
	}
};
