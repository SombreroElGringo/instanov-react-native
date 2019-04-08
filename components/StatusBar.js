import React from "react";
import {StatusBar as SB, View} from "react-native";
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
`;