import React from "react";
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import { Home, TodoBox, NextWeek } from "../../pages/Main";
import { fadeIn, fromBottom } from "react-navigation-transitions";

const HomeNavigator = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false,
        header: null
      })
    },
    TodoBox: {
      screen: TodoBox,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false,
        header: null
      })
    },
    NextWeek: {
      screen: NextWeek,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false,
        header: null
      })
    }
  },
  {
    initialRouteName: "Home"
  }
);

const RootNavigator = createStackNavigator(
  {
    HomeNavigator: {
      screen: HomeNavigator,
      navigationOptions: ({ navigation }) => ({
        gesturesEnabled: false,
        header: null
      })
    }
  },
  {
    initialRouteName: "HomeNavigator",
    transitionConfig: () => fadeIn()
  }
);

const AppNavigator = createSwitchNavigator(
  {
    RootNavigator
  },
  {
    initialRouteName: "RootNavigator"
  }
);

export default createAppContainer(AppNavigator);
