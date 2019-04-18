import React from "react";
import {FlatList, Image, LayoutAnimation, TouchableOpacity, View} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styled from "styled-components";
import EditUsername from "../components/EditUsername";
import Thumbnail from "../components/Thumbnail";
import {Authentication} from "../helpers/firebase";
import {connected} from "../helpers/redux";
import {saveNewUsername} from "../services/authentication";

@connected
export default class Profile extends React.Component {
	state = {
		username: undefined,
		editUsername: false,
		perRow: 3,
	};

	componentDidMount() {
		const {fetchPosts} = this.props;
		fetchPosts();
	}

	handleEditUsername() {
		this.setState({editUsername: !this.state.editUsername});
	}

	handleSaveUsername = async (user) => {
		const {username} = this.state;
		await saveNewUsername(user, username);
		this.setState({editUsername: false});
	};

	handleUserPhoto = async () => {
		this.props.navigation.navigate("SelectAvatar");
	};

	render() {
		const {editUsername, perRow} = this.state;
		const {posts = []}           = this.props;
		const user                   = Authentication.currentUser;
		LayoutAnimation.easeInEaseOut();

		return <View style={{flex: 1}}>
			<View style={{flexDirection: "row", alignItems: "center", padding: 7}}>

				<TouchableOpacity onPress={() => this.handleUserPhoto()}>
					<Avatar source={{uri: user.photoURL || "https://mastodon.sdf.org/system/accounts/avatars/000/108/313/original/035ab20c290d3722.png?1541993604"}}/>
				</TouchableOpacity>
				<EditUsername editUsername={editUsername}
				              user={user}
				              onChangeText={(text) => this.setState({username: text})}
				              onPress={() => this.handleEditUsername()}
				              onPress1={() => this.handleSaveUsername(user)}
				/>
			</View>
			<Divider/>
			<ActionsWrapper>
				<TouchableOpacity onPress={() => this.setState({perRow: 3})}>
					<Icon name="th" color={perRow === 1 ? "lightgrey" : "black"}/>
				</TouchableOpacity>
				<TouchableOpacity onPress={() => this.setState({perRow: 1})}>
					<Icon name="square" color={perRow === 3 ? "lightgrey" : "black"}/>
				</TouchableOpacity>
			</ActionsWrapper>
			<Divider/>
			<FlatListWrapper>
				<FlatList data={posts.filter(p => p.user.uid === user.uid)}
				          renderItem={({item}) => <Thumbnail {...item} perRow={perRow}/>}
				          keyExtractor={i => i.id}
				          numColumns={perRow}
				          key={perRow}
				          removeClippedSubviews
				/>
			</FlatListWrapper>
		</View>;
	}
}

const Divider         = styled(View)` background-color: lightgrey; height: 1px; margin: 0 0 4px 0; `;
const ActionsWrapper  = styled(View)`flex-direction: row; align-items: center; justify-content: space-around`;
const Icon            = styled(FontAwesome)`font-size: 20px; padding: 5px;`;
const FlatListWrapper = styled(View)`padding:0 ${({perRow}) => perRow === 3 && 3}; flex: 1`;
const Avatar          = styled(Image)`width: 64px; height: 64px; border-radius: 32px; margin-right: 10px`;
