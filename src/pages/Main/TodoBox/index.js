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
import { NewWriteToDoModal, ToDoEditModal } from "../../../modals";
import axios from "axios";

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
      todoDataForModal: {
        todo_text: "",
        project: {
          project_text: ""
        },
        goal_date: null
      },
      projectData: [
        {
          project_text: ""
        }
      ],
      NewWriteToDoModal: false,
      ToDoEditModal: false
    };
  }

  _setToDoEditModal = (visible, item) => {
    this.setState(
      {
        todoDataForModal: item
      },
      () => {
        console.log(this.state.todoDataForModal);
        this.setState({
          ToDoEditModal: visible
        });
      }
    );
  };

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
      formData.append("todo_text", todoValue.todo_text);
      formData.append(
        "goal_date",
        todoValue.goal_date.getFullYear() +
          "-" +
          (todoValue.goal_date.getMonth() + 1) +
          "-" +
          todoValue.goal_date.getDate() +
          "T00:00:00Z"
      );
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
        <View style={{ flex: 1 }}>
          <FlatList
            data={this.state.todoData}
            renderItem={({ item }) => {
              const goalDate = "" + item.goal_date;
              if (item.goal_date === null) {
                return (
                  <TouchableOpacity
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "grey",
                      height: 50,
                      justifyContent: "center"
                    }}
                    onPress={() => {
                      this._setToDoEditModal(true, item);
                    }}
                  >
                    <Text style={{ color: "black", marginLeft: 10 }}>
                      {item.todo_text}
                    </Text>
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity
                    style={{
                      borderBottomWidth: 1,
                      borderBottomColor: "grey",
                      height: 50,
                      justifyContent: "center"
                    }}
                    onPress={() => {
                      this._setToDoEditModal(true, item);
                    }}
                  >
                    <Text style={{ color: "black", marginLeft: 10 }}>
                      {item.todo_text}
                    </Text>
                    <Text style={{ color: "black", marginLeft: 10 }}>
                      {goalDate.substring(0, 10) +
                        " " +
                        goalDate.substring(11, 16)}
                    </Text>
                  </TouchableOpacity>
                );
              }
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
        <ToDoEditModal
          setModalProp={this._setToDoEditModal}
          animationType={"none"}
          transparent={true}
          data={this.state.todoDataForModal}
          visible={this.state.ToDoEditModal}
          _makeNewTodo={this._makeNewTodo}
        />
      </View>
    );
  }
}

export default TodoBox;
