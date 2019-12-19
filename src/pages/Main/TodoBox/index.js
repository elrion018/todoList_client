import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { SideBar } from "../../../components";
import Icon from "react-native-vector-icons/FontAwesome";
import Constants from "expo-constants";
import { FlatList } from "react-native-gesture-handler";
import {
  URL_GET_TODO_LIST,
  URL_GET_PROJECT_LIST,
  URL_POST_TODO_LIST
} from "../../../globals/api";
import { NewWriteToDoModal } from "../../../modals";
import axios from "axios";

// axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.xsrfHeaderName = "X-CSRFToken";

class TodoBox extends React.Component {
  constructor() {
    super();

    this.state = {
      isOpened: false,
      todoData: [
        {
          todo_text: ""
        }
      ],
      projectData: [
        {
          project_text: ""
        }
      ],
      NewWriteToDoModal: false
    };
  }

  _setNewWriteToDoModal = visible => {
    this.setState({
      NewWriteToDoModal: visible
    });
  };

  _getTodoList = async () => {
    try {
      const config = {
        headers: {}
      };
      const res = await axios.get(URL_GET_TODO_LIST, config);

      if (res.status === 200) {
        this.setState({
          todoData: res.data
        });
      }
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };

  _getProjectList = async () => {
    try {
      const config = {
        headers: {}
      };
      const res = await axios.get(URL_GET_PROJECT_LIST, config);

      if (res.status === 200) {
        this.setState({
          projectData: res.data
        });
      }
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };

  _makeNewTodo = async (todoValue, projectValue) => {
    try {
      const config = {
        headers: {}
      };
      const formData = new FormData();
      formData.append("todo_text", todoValue);
      formData.append("project_id", projectValue.slug);
      const res = await axios.post(URL_POST_TODO_LIST, formData, config);

      if (res.status === 201) {
        this._getTodoList();
      }
    } catch (error) {
      console.log(error);
      console.error(error);
    }
  };

  componentDidMount() {
    this._getTodoList();
    this._getProjectList();
    this.focusListener1 = this.props.navigation.addListener("didFocus", () => {
      this._getTodoList();
      this._getProjectList();
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: Constants.statusBarHeight }}></View>
        <View
          style={{
            height: 55,
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
        </View>
        <View>
          <FlatList
            data={this.state.todoData}
            renderItem={({ item }) => {
              return (
                <View
                  style={{
                    borderBottomWidth: 1,
                    // borderTopColor: "grey",
                    borderBottomColor: "grey",
                    height: 50,
                    justifyContent: "center"
                  }}
                >
                  <Text style={{ color: "black", marginLeft: 10 }}>
                    {item.todo_text}
                  </Text>
                </View>
              );
            }}
          />
        </View>
        <TouchableOpacity
          style={{
            position: "absolute",
            bottom: 10,
            width: 50,
            height: 50,
            borderRadius: 30,
            right: 10,
            backgroundColor: "blue",
            alignItems: "center",
            justifyContent: "center"
          }}
          onPress={() => {
            this._setNewWriteToDoModal(true);
          }}
        >
          <Icon name="plus" size={30}></Icon>
        </TouchableOpacity>
        <NewWriteToDoModal
          setModalProp={this._setNewWriteToDoModal}
          animationType={"none"}
          transparent={true}
          data={this.state.projectData}
          visible={this.state.NewWriteToDoModal}
          _makeNewTodo={this._makeNewTodo}
        />
      </View>
    );
  }
}

export default TodoBox;
