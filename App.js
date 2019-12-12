import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { AppNavigator } from "./src/system";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {};
  }

  render() {
    return (
      <View style={styles.container}>
        <AppNavigator ref={el => (this.navigation = el)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff"
  }
});
