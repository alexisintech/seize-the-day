import React, { useReducer } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./style.css";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import { createTodo, getTodos } from "./utils/index";
import { completeTodo } from "./utils/index";
import { deleteTodo } from "./utils/index";
import { convertLength } from "@mui/material/styles/cssUtils";

export const initialState = {
  tasks: [],
};

export const AppContext = React.createContext(initialState);

const ACTIONS = {
  CREATE_TODO: "CREATE_TODO",
  COMPLETE_TODO: "COMPLETE_TODO",
  DELETE_TODO: "DELETE_TODO",
  GET_TODOS: "GET_TODOS",
};

const appReducer = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.GET_TODOS:
      let updateState = {};
      getTodos().then((data) => {
        updateState = { ...state, data };
      });
      console.log(updateState);
      return updateState;
    // case ACTIONS.CREATE_TODO:
    //   let updatedState = [];
    //   createTodo(payload).then(() => {
    //     updatedState = [
    //       ...state,
    //       // Instead of:
    //       // {
    //       //   title: payload.title,
    //       //   subTasks: payload.subTasks,
    //       //   tags: payload.tags,
    //       // },
    //       payload,
    //     ];
    //   });
    // case ACTIONS.DELETE_TODO:
    //   deleteTodo(payload);
    //   return updatedState;
    default:
      return state;
  }
};

const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/profile",
    element: <Profile />,
  },
  {
    path: "/logout",
    element: <Index />,
  },
]);

function App() {
  const [state, dispatch] = useReducer(appReducer, initialState);

  return (
    <AppContext.Provider value={[state, dispatch]}>
      <RouterProvider router={router} />
    </AppContext.Provider>
  );
}

export default App;
