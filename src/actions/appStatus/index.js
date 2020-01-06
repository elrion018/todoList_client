import * as types from "./types";

//appStatus

export const ProjectUpdate = project => {
  return {
    type: types.USER_UPDATE,
    project
  };
};

export const TodoUpdate = todo => {
  return {
    type: types.TODO_UPDATE,
    todo
  };
};

export const SubTodoUpdate = subtodo => {
  return {
    type: types.SUBTODO_UPDATE,
    subtodo
  };
};
