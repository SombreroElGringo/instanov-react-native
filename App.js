import {Font} from "expo";
import React from "react";
import {View} from "react-native";
import {Provider} from "react-redux";
import StackNavigator from "./components/StackNavigator";
import StatusBar from "./components/StatusBar";
import store from "./redux/store";

class App extends React.Component {
	state = {
		fontLoaded: false,
	};

	async componentDidMount() {

		await this._loadAssetsAsync();
	}

	async _loadAssetsAsync() {
		try {
			await Font.loadAsync({
				"BerkshireSwash": require("./assets/fonts/BerkshireSwash-Regular.ttf"),
			});
			this.setState({fontLoaded: true});
		} catch (e) {
			Log.error(e);
		}
	}

	render() {
		const {fontLoaded} = this.state;

		if (!fontLoaded === undefined)
			return null;

		return <View style={{flex: 1}}>
			<StatusBar/>
			<StackNavigator/>
		</View>;
	}
}

export default () => <Provider store={store}>
	<App/>
</Provider>
