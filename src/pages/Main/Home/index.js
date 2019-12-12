import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Container,
  Header,
  Left,
  Body,
  Right,
  Button,
  Icon,
  Title,
  Drawer
} from "native-base";
import { SideBar } from "../../../components";
import Constants from "expo-constants";

class Home extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpened: false
    };
  }

  componentDidMount() {}

  openDrawer = () => {
    this.drawer._root.open();
    this.setState({
      isOpened: !this.state.isOpened
    });
  };

  closeDrawer = () => {
    this.drawer._root.close();
    this.setState({
      isOpened: !this.state.isOpened
    });
  };

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Container>
          <View style={{ height: Constants.statusBarHeight }}></View>
          <Header>
            <Left>
              <TouchableOpacity
                onPress={() => {
                  this.state.isOpened ? this.closeDrawer() : this.openDrawer();
                }}
              >
                <Icon name="menu"></Icon>
              </TouchableOpacity>
            </Left>
            <Body>
              <Text style={{ color: "white" }}>오늘</Text>
            </Body>
            <Right></Right>
          </Header>
          <Drawer
            ref={ref => {
              this.drawer = ref;
            }}
            content={<SideBar navigation={this.props.navigation} />}
            onClose={() => this.closeDrawer()}
          ></Drawer>
        </Container>
      </View>
    );
  }
}

export default Home;
