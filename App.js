import {
  createBottomTabNavigator,
  createStackNavigator,
} from 'react-navigation';

import TabBarIcon from './components/TabBarIcon';

import StoriesFlowScreen from './screens/StoriesFlowScreen';
import NewStoryScreen from './screens/NewStoryScreen';
import SelectImageScreen from './screens/SelectImageScreen';

const navigator = createBottomTabNavigator(
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

const stackNavigator = createStackNavigator(
  {
    Main: {
      screen: navigator,
      navigationOptions: { title: 'Instanov 🔥' },
    },
    NewStory: NewStoryScreen,
  },
  {
    cardStyle: { backgroundColor: 'white' },
  },
);

export default stackNavigator;
