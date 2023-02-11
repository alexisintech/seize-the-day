import { getTodos } from "./utils/index";

export const initialState = {
  tasks: [],
};

const ACTIONS = {
  CREATE_TODO: "CREATE_TODO",
  COMPLETE_TODO: "COMPLETE_TODO",
  DELETE_TODO: "DELETE_TODO",
  GET_TODOS: "GET_TODOS",
};

const appReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.GET_TODOS:
      return {
        tasks: [...payload],
      };
    case ACTIONS.CREATE_TODO:
      return {
        tasks: [...state.tasks, payload],
      };
    case ACTIONS.DELETE_TODO:
      return {
        tasks: [...payload],
      };
    case ACTIONS.COMPLETE_TODO:
      return {
        tasks: [...payload],
      };
    default:
      return state;
  }
};

export default appReducer;
