import React from "react";
import {View, StatusBar as SB} from "react-native";
import {Constants} from "expo";
import styled from "styled-components";

export default class StatusBar extends React.Component {
	render() {
		return <Wrapper>
			<SB barStyle="dark-content"/>
		</Wrapper>;
	}
};

const Wrapper = styled(View)`
	background-color: whitesmoke;
	height: ${Constants.statusBarHeight}px;
`;