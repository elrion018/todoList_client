import * as React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { TodoBox, ToDay, NextWeek } from "../../pages/Main";
function TodoBoxFuc({ navigation }) {
  return <TodoBox navigation={navigation}></TodoBox>;
}

function ToDayFuc({ navigation }) {
  return <ToDay navigation={navigation}></ToDay>;
}

function NextWeekFuc({ navigation }) {
  return <NextWeek navigation={navigation}></NextWeek>;
}

const Drawer = createDrawerNavigator();

function MyDrawer() {
  return (
    <Drawer.Navigator initialRouteName="TodoBox">
      <Drawer.Screen
        name="TodoBox"
        component={TodoBoxFuc}
        options={{ drawerLabel: "관리함" }}
      />
      <Drawer.Screen
        name="ToDay"
        component={ToDayFuc}
        options={{ drawerLabel: "오늘" }}
      />
      <Drawer.Screen
        name="NextWeek"
        component={NextWeekFuc}
        options={{ drawerLabel: "다음 7일" }}
      />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <MyDrawer />
    </NavigationContainer>
  );
}
