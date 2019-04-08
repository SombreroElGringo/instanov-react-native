import React from "react";
import {FlatList, Image, Text, View} from "react-native";
import styled from "styled-components";
import {Authentication} from "../helpers/firebase";
import {connected} from "../helpers/redux";
import {getWidth} from "../helpers/userDeviceInfo";

class Thumbnail extends React.PureComponent {
	render() {
		return <Image source={{uri: this.props.image, width: getWidth() / 3, height: getWidth() / 3}}
		              style={{borderWidth: 3, borderColor: "white"}}
		/>;
	}
}

@connected
export default class Profile extends React.Component {
	componentDidMount() {
		const {fetchPosts} = this.props;
		fetchPosts();
	}

	render() {
		const {posts = []} = this.props;
		const user         = Authentication.currentUser;
		return <View>
			<View style={{flexDirection: "row", alignItems: "center", padding: 7}}>
				<Image source={{uri: user.photoURL || "https://mastodon.sdf.org/system/accounts/avatars/000/108/313/original/035ab20c290d3722.png?1541993604"}}
				       style={{width: 64, height: 64, borderRadius: 32, marginRight: 10}}
				/>
				<View><Text>Username</Text></View>
			</View>
			<Divider/>
			<View style={{paddingHorizontal: 3}}>
				<FlatList data={posts.filter(p => p.user.uid === user.uid)}
				          renderItem={({item}) => <Thumbnail {...item}/>}
				          keyExtractor={i => i.id}
				          numColumns={3}
				          removeClippedSubviews
				/>
			</View>
		</View>;
	}
}

const Divider = styled(View)`
  background-color: lightgrey;
  height: 1px;
  margin: 0 0 4px 0;
`;