import React from "react";
import { AppRegistry, Image, StatusBar, View, Text } from "react-native";
import { Container, Content } from "native-base";

import { TouchableOpacity } from "react-native-gesture-handler";

export default class SideBar extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <Container>
        <Content>
          <View style={{ height: 80, width: 30 }}></View>
          <TouchableOpacity
            style={{
              width: "100%",
              height: 20
            }}
            onPress={() => {
              this.props.navigation.push("TodoBox");
            }}
          >
            <Text>관리함</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "100%",
              height: 20
            }}
            onPress={() => {
              this.props.navigation.push("Home");
            }}
          >
            <Text>오늘</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: "100%",
              height: 20
            }}
            onPress={() => {
              this.props.navigation.push("NextWeek");
            }}
          >
            <Text>다음 7일</Text>
          </TouchableOpacity>
        </Content>
      </Container>
    );
  }
}
