import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { SideBar } from "../../../components";
import Icon from "react-native-vector-icons/FontAwesome";
import Constants from "expo-constants";
import { FlatList } from "react-native-gesture-handler";
import { URL_GET_TODO_LIST } from "../../../globals/api";
import axios from "axios";

axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFToken";

class TodoBox extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpened: false,
      data: [
        {
          todo_text: "leisure"
        },
        {
          todo_text: "english"
        }
      ]
    };
  }

  _getTodoList = async () => {
    try {
      const config = {
        headers: {
          "Access-Control-Allow-Origin": "*"
        }
      };
      // const res = await axios.get(URL_GET_TODO_LIST)
      const res = await axios.get("https://127.0.0.1:8000/todo/todo", config);

      // if (res.status === 200) {
      //   this.setState({
      //     data: res.data
      //   });
      // }
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };

  // _getTodoList = async () => {
  //   try {
  //     const config = {
  //       method: "GET",
  //       mode: "cors"
  //       // headers: {
  //       //   "Content-Type": "application/x-www-form-urlencoded"
  //       // }
  //     };

  //     const res = await fetch(URL_GET_TODO_LIST, config);
  //   } catch (error) {
  //     console.log(error);
  //     console.error(error);
  //   }
  // };

  componentDidMount() {
    this._getTodoList();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: Constants.statusBarHeight }}></View>
        <View
          style={{
            height: 45,
            backgroundColor: "blue",
            flexDirection: "row",
            alignItems: "center"
          }}
        >
          <TouchableOpacity style={{ marginLeft: 10 }}>
            <Icon name="bars" size={30}></Icon>
          </TouchableOpacity>

          <View style={{ marginLeft: 40 }}>
            <Text style={{ color: "white" }}>관리함</Text>
          </View>
          <View></View>
        </View>
        <View>
          <FlatList
            data={this.state.data}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    height: 30
                    // backgroundColor: "red"
                  }}
                >
                  <Text style={{ color: "black" }}>{item.todo_text}</Text>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

export default TodoBox;
