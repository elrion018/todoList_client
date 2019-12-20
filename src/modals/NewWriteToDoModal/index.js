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
import { Calendar, CalendarList, Agenda } from "react-native-calendars";
import Menu, { MenuItem, MenuDivider } from "react-native-material-menu";
import Icon from "react-native-vector-icons/FontAwesome";

class NewWriteToDoModal extends React.Component {
  constructor() {
    super();

    this.state = {
      bgOpacity: new Animated.Value(0),
      pageHeight: new Animated.Value(0),
      todoValue: {
        todo_text: "",
        goal_date: new Date()
      },
      projectValue: {},
      selectedDay: null,
      isCalendars: false
    };
  }

  componentDidMount() {}

  _menu = null;

  onSelectDay = day => {
    this.setState({
      selectedDay: day.dateString
    });
  };

  setDateByButton = index => {};

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

  _setIsCalendars = () => {
    this.setState({
      isCalendars: !this.state.isCalendars
    });
  };

  _openCalendarsAnimate = () => {
    Animated.timing(this.state.pageHeight, {
      toValue: 650,
      duration: 500
    }).start(() => {
      this._setIsCalendars();
    });
  };

  _closeCalendarsAnimate = () => {
    Animated.timing(this.state.pageHeight, {
      toValue: 150,
      duration: 500
    }).start(() => {
      this._setIsCalendars();
    });
  };

  _dismissAnimate = () => {
    Animated.timing(this.state.bgOpacity, {
      toValue: 0,
      duration: 500
    });
    Animated.timing(this.state.pageHeight, {
      toValue: 0,
      duration: 500
    }).start(() => {
      this.props.setModalProp(false);
    });
  };

  handleChange = text => {
    let copiedArray = this.state.todoValue;
    copiedArray = {
      ...copiedArray,
      todo_text: text
    };
    console.log(copiedArray);
    this.setState({
      todoValue: copiedArray
    });
  };

  render() {
    const day = ["오늘", "내일", "다음 주", "권장"];
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
          {this.state.isCalendars ? (
            <>
              <View
                style={{
                  paddingTop: 20,
                  borderTopLeftRadius: 12,
                  borderTopRightRadius: 12,
                  width: "100%",
                  height: 300,
                  paddingRight: 32,
                  paddingLeft: 32,
                  backgroundColor: "white"
                }}
              >
                <View style={{ flexDirection: "row" }}>
                  <Icon name="pen" size={20}></Icon>
                  <TouchableOpacity style={{ marginLeft: 10 }}>
                    <Text>
                      {this.state.todoValue.goal_date.getFullYear() +
                        "년 " +
                        (this.state.todoValue.goal_date.getMonth() + 1) +
                        "월 " +
                        this.state.todoValue.goal_date.getDate() +
                        "일"}
                    </Text>
                  </TouchableOpacity>
                </View>
                {day.map(item => {
                  return (
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        height: 30,
                        width: "100%"
                      }}
                    >
                      <View
                        style={{
                          height: 20,
                          width: 20,
                          backgroundColor: "blue"
                        }}
                      ></View>

                      <Text style={{ marginLeft: 10 }}>{item}</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
              <CalendarList
                style={{
                  height: 350
                }}
                onDayPress={this.onSelectDay}
                markedDates={{
                  [this.state.selectedDay]: {
                    selected: true,
                    selectedColor: "blue"
                  }
                }}
                pastScrollRange={50}
                futureScrollRange={50}
                scrollEnabled={true}
                showScrollIndicator={true}
              ></CalendarList>
            </>
          ) : (
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
                  value={this.state.todoValue.todo_text}
                  onChangeText={text => this.handleChange(text)}
                ></TextInput>
              </View>
              <Text>{this.state.todoValue.todo_text}</Text>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity
                  style={{ width: 70 }}
                  onPress={() => {
                    if (this.state.isCalendars) {
                      this._closeCalendarsAnimate();
                    } else {
                      this._openCalendarsAnimate();
                    }
                  }}
                >
                  <Text>일정</Text>
                </TouchableOpacity>
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
                onPress={() => {
                  _makeNewTodo(this.state.todoValue, this.state.projectValue);
                  setModalProp(false);
                  this.setState({
                    todoValue: {
                      todo_text: "",
                      goal_date: new Date()
                    }
                  });
                }}
              >
                <Icon name={"send"} size={30}></Icon>
              </TouchableOpacity>
            </View>
          )}
        </Animated.View>
      </Modal>
    );
  }
}

export default NewWriteToDoModal;
