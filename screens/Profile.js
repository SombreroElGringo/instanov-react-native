import React from "react";
import {FlatList, Image, Text, TextInput, View, TouchableOpacity} from "react-native";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import styled from "styled-components";
import {Authentication} from "../helpers/firebase";
import {connected} from "../helpers/redux";
import {getWidth} from "../helpers/userDeviceInfo";
import { saveNewUsername } from "../services/authentication";

class Thumbnail extends React.PureComponent {
	render() {
		return <Image source={{uri: this.props.image, width: getWidth() / 3, height: getWidth() / 3}}
		              style={{borderWidth: 3, borderColor: "white"}}
		/>;
	}
}

@connected
export default class Profile extends React.Component {
	state = {
		username: undefined,
		editUsername: false,
	};

	componentDidMount() {
		const {fetchPosts} = this.props;
		fetchPosts();
	}

	handleEditUsername() {
		this.setState({ editUsername: !this.state.editUsername });
	}

	handleSaveUsername = async (user) => {
		const { username } = this.state;
		await saveNewUsername(user, username);
		this.setState({ editUsername: false });
	}

	handleUserPhoto = async () => {
		this.props.navigation.navigate("SelectAvatar")
	}

	render() {
		const { editUsername } = this.state;
		const {posts = []} = this.props;
		const user         = Authentication.currentUser;
		return <View>
			<View style={{flexDirection: "row", alignItems: "center", padding: 7}}>

				<TouchableOpacity onPress={() => this.handleUserPhoto()}>
					<Image source={{uri: user.photoURL || "https://mastodon.sdf.org/system/accounts/avatars/000/108/313/original/035ab20c290d3722.png?1541993604"}}
								style={{width: 64, height: 64, borderRadius: 32, marginRight: 10}}
					/>
				</TouchableOpacity>

					{editUsername ?
						(
							<View>
								<TextInput
									placeholder={user.displayName}
									returnKeyLabel={"next"}
									autoCapitalize="none"
									onChangeText={(text) => this.setState({username: text})}
								/>
								<TouchableOpacity onPress={() => this.handleEditUsername()}>
									<Icon name="window-close"/>
								</TouchableOpacity>
								<TouchableOpacity onPress={() => this.handleSaveUsername(user)}>
									<Icon name="check-square"/>
								</TouchableOpacity>
							</View>
						) : (
						<View>
							<Text>{user.displayName}</Text>
							<TouchableOpacity onPress={() => this.handleEditUsername()}>
								<Icon name="edit"/>
							</TouchableOpacity>
						</View>
						)
					}
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
const Icon        = styled(FontAwesome)`font-size: 20px; padding: 5px;`;
