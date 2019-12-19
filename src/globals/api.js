export let ADDRESS;

if (__DEV__) {
  ADDRESS = "http://35.194.105.204:8000";
} else {
  ADDRESS = "http://35.194.105.204:8000";
}

export const URL_GET_TODO_LIST = `${ADDRESS}/todo/todo`; // todolist 가져오기
export const URL_POST_TODO_LIST = `${ADDRESS}/todo/todo`; //새로운 todo 만들기
export const URL_GET_PROJECT_LIST = `${ADDRESS}/todo/project`; // project list 가져오기
