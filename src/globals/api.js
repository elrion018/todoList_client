export let ADDRESS;

if (__DEV__) {
  ADDRESS = "http://127.0.0.1:8000";
} else {
  ADDRESS = "http://127.0.0.1:8000";
}

export const URL_GET_TODO_LIST = `${ADDRESS}/todo/todo`; // todolist 가져오기
