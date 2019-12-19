import React from "react";
import {
  View,
  Modal,
  Text,
  Animated,
  TouchableOpacity,
  TouchableWithoutFeedback,
  TextInput,
  TouchableHighlightBase
} from "react-native";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import Icon from "react-native-vector-icons/FontAwesome";

class NewWriteToDoModal extends React.Component {
  constructor() {
    super();

    this.state = {
      bgOpacity: new Animated.Value(0),
      pageHeight: new Animated.Value(0),
      todoValue: "",
      projectValue: {}
    };
  }

  componentDidMount() {}

  _menu = null;

  setMenuRef = ref => {
    this._menu = ref;
  };

  hideMenu = item => {
    this.setState({
      projectValue: item
    });
    this._menu.hide();
  };

  showMenu = () => {
    this._menu.show();
  };

  _firstLoad = () => {
    this.setState({
      projectValue: this.props.data[0]
    });
    Animated.timing(this.state.bgOpacity, {
      toValue: 1,
      duration: 500
    }).start();
    Animated.timing(this.state.pageHeight, {
      toValue: 150,
      duration: 500
    }).start();
  };

  _dismissAnimate = () => {
    Animated.timing(this.state.bgOpacity, {
      toValue: 0,
      duration: 500
    });
    Animated.timing(this.state.pageHeight, {
      toValue: 150,
      duration: 500
    }).start(() => {
      this.props.setModalProp(false);
    });
  };

  handleChange = text => {
    this.setState({
      todoValue: text
    });
  };

  render() {
    const {
      animationType,
      transparent,
      visible,
      setModalProp,
      data,
      _makeNewTodo
    } = this.props;
    return (
      <Modal
        animationType={animationType}
        transparent={transparent}
        visible={visible}
        onShow={() => {
          this._firstLoad();
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            this._dismissAnimate();
          }}
        >
          <Animated.View
            style={{
              height: "100%",
              width: "100%",
              position: "absolute",
              backgroundColor: "rgba(100,100,100,0.25)",

              opacity: this.state.bgOpacity
            }}
          ></Animated.View>
        </TouchableWithoutFeedback>
        <Animated.View
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            height: this.state.pageHeight
          }}
        >
          <View
            style={{
              paddingTop: 20,
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              width: "100%",
              height: 150,
              paddingRight: 32,
              paddingLeft: 32,
              backgroundColor: "white"
            }}
          >
            <View>
              <TextInput
                placeholder={"할 일을 입력하세요"}
                value={this.state.todoValue}
                onChangeText={text => this.handleChange(text)}
              ></TextInput>
            </View>
            <Text>{this.state.todoValue}</Text>
            <View>
              <Menu
                style={{ width: 70 }}
                ref={this.setMenuRef}
                button={
                  <TouchableOpacity onPress={this.showMenu}>
                    <Text>{this.state.projectValue.project_text}</Text>
                  </TouchableOpacity>
                }
              >
                {data.map((item, index) => {
                  return (
                    <>
                      <MenuItem
                        onPress={() => {
                          this.hideMenu(item);
                        }}
                      >
                        {item.project_text}
                      </MenuItem>
                      <MenuDivider />
                    </>
                  );
                })}
              </Menu>
            </View>
            <TouchableOpacity
              style={{
                position: "absolute",
                right: 10,
                bottom: 10,
                width: 50,
                height: 50,
                borderRadius: 30,
                backgroundColor: "blue",
                alignItems: "center",
                justifyContent: "center"
              }}
              onPress={() =>
                _makeNewTodo(this.state.todoValue, this.state.projectValue)
              }
            >
              <Icon name={"send"} size={30}></Icon>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </Modal>
    );
  }
}

export default NewWriteToDoModal;
