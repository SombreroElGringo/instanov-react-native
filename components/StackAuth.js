import { createStackNavigator} from "react-navigation";

import SignScreen from "../screens/SignScreen";

const StackAuth = createStackNavigator(
	{
		SignForm: SignScreen,
	},{
    headerMode: "none",
  }
);

export default StackAuth;
