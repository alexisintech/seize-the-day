import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Appbar from "../components/Appbar";
import SideNav from "../components/SideNav";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import List from "@mui/material/List";
import { ListItem, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import AddTaskIcon from "@mui/icons-material/AddTask";
import { useNavigate } from "react-router-dom";
import { quotes } from "../quotes";
import ControlPoint from "@mui/icons-material/ControlPoint";
import AddTask from "@mui/icons-material/AddTask";

const api_base =
  process.env.NODE_ENV === "development"
    ? "http://localhost:2222"
    : "https://seize-the-day-api.up.railway.app";

const drawerWidth = 300;

function todaysDate() {
  const date = new Date();
  const day = date.getDate();
  const month = date.getMonth(); // don't forget, January is 0!
  const options = { month: "long" };
  const year = date.getFullYear();
  const monthAsString = new Intl.DateTimeFormat("en-US", options).format(date);
  return {
    day,
    month,
    year,
    dateWithString: `${monthAsString} ${day}, ${year}`,
  };
}

export default function Profile() {
  const [day, setDay] = useState("");
  const [user, setUser] = useState("");
  const [todos, setTodos] = useState([]);
  const [quote, setQuote] = useState("");
  const [popupActive, setPopupActive] = useState(false);
  // when creating a todo (on the "add task" popup), newTodo is for updating the state on the popup
  const [newTodo, setNewTodo] = useState({
    title: "",
    subTasks: [],
    tags: [],
  });
  const [newSubtask, setNewSubtask] = useState("");
  const [emptyAlert, setEmptyAlert] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
    getTodos();
    setDay(todaysDate().day);
  }, []);

  useEffect(() => {
    setQuote(quotes[Math.floor(Math.random() * quotes.length)]);
  }, [day]);

  const getUser = () => {
    const token = localStorage.getItem("auth");
    fetch(api_base + "/getUser", {
      headers: { authorization: `bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        if (!data.message.userName) {
          navigate("/login");
        }

        setUser(data.message.userName);
      })
      .catch((err) => console.error("Error: ", err));
  };

  const getTodos = () => {
    const token = localStorage.getItem("auth");
    fetch(api_base + "/profile", {
      headers: { authorization: `bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setTodos(data))
      .catch((err) => console.error("Error: ", err));
  };

  const completeTodo = async (id) => {
    // NOTE: Make sure to set the local storage key before trying to get it.
    const token = localStorage.getItem("auth");
    const data = await fetch(api_base + "/profile/complete/" + id, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${token}`,
      },
    }).then((res) => res.json());

    setTodos((todos) =>
      todos.map((todo) => {
        if (todo._id === data._id) {
          todo.complete = data.complete;
        }

        return todo;
      })
    );
  };

  const createTodo = async () => {
    const token = localStorage.getItem("auth");
    const data = await fetch(api_base + "/profile/createTodo", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `bearer ${token}`,
      },
      body: JSON.stringify({
        title: newTodo.title,
        subTasks: newTodo.subtasks,
        tags: [],
      }),
    }).then((res) => res.json());

    console.log(data);

    setTodos([...todos, data]);

    setPopupActive(false);
    setNewTodo({ title: "", subTasks: [], tags: [] });
  };

  const deleteTodo = async (id) => {
    const token = localStorage.getItem("auth");
    const data = await fetch(api_base + "/profile/delete/" + id, {
      method: "DELETE",
      headers: { authorization: `bearer ${token}` },
    }).then((res) => res.json());

    setTodos((todos) => todos.filter((todo) => todo._id !== data.result._id));
  };

  const updateSubtasks = () => {
    if (newSubtask === "") {
      setEmptyAlert(true);
      return;
    }

    setNewTodo((prevState) => ({
      ...prevState,
      subTasks: [...newTodo.subTasks, newSubtask],
    }));
    setNewSubtask("");
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* <Appbar /> */}
      {/* <SideNav /> */}
      <ResponsiveDrawer />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          overflow: "auto",
          backgroundColor: "#f5f5f5",
          py: 10,
          px: 5,
        }}
        className="main--container"
      >
        <Toolbar />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component="h2" variant="h2" sx={{ fontWeight: 700 }}>
            Welcome, {user}!
          </Typography>

          <div className="addPopup" onClick={() => setPopupActive(true)}>
            + New Task
          </div>

          {popupActive ? (
            <div className="popup">
              <div className="closePopup" onClick={() => setPopupActive(false)}>
                X
              </div>
              <div className="content">
                <h3>New task</h3>
                <input
                  type="text"
                  className="todo-name-input"
                  placeholder="Title of task..."
                  onChange={(e) =>
                    setNewTodo((todo) => ({ ...todo, title: e.target.value }))
                  }
                  value={newTodo.title}
                />
                <Typography
                  sx={{
                    textTransform: "uppercase",
                    fontWeight: 700,
                  }}
                >
                  Subtasks
                </Typography>
                {newTodo.subTasks.length > 0 && (
                  <Box>
                    <List>
                      {newTodo.subTasks.map((subtask) => (
                        <ListItem>{subtask}</ListItem>
                      ))}
                    </List>
                  </Box>
                )}
                <Box sx={{ display: "flex", alignItems: "center" }}>
                  <input
                    type="text"
                    className="todo-task-input"
                    placeholder="New subtasks"
                    onChange={(e) => {
                      setNewSubtask(e.target.value);
                      setEmptyAlert(false);
                    }}
                    value={newSubtask}
                  />
                  <AddTaskIcon
                    sx={{ cursor: "pointer" }}
                    onClick={updateSubtasks}
                  ></AddTaskIcon>
                </Box>
                {emptyAlert && (
                  <Typography sx={{ color: "red" }}>
                    This field cannot be empty!
                  </Typography>
                )}

                <Typography>Tags</Typography>

                <div className="button" onClick={createTodo}>
                  Create Task
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
        </Box>

        <Typography variant="h6" sx={{ fontStyle: "italic" }}>
          {todaysDate().dateWithString}
        </Typography>

        <Typography>"{quote}"</Typography>

        <Typography component="h3" variant="h5" sx={{ marginTop: "3rem" }}>
          What I will try to accomplish today:
        </Typography>
        <Box>
          <div className="todos">
            {todos.length > 0 ? (
              todos
                .filter((todo) => !todo.complete)
                .map((todo) => (
                  <div className="todo-container">
                    <div className={"todo"} key={todo._id}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                          cursor: "pointer",
                        }}
                        onClick={() => completeTodo(todo._id)}
                      >
                        <div className="checkbox"></div>

                        <div className="title">{todo.title}</div>
                      </Box>

                      <div
                        className="delete-todo"
                        onClick={() => deleteTodo(todo._id)}
                      >
                        <DeleteIcon></DeleteIcon>
                      </div>
                    </div>
                  </div>
                ))
            ) : (
              <p className="no-tasks">You currently have no tasks</p>
            )}
          </div>
        </Box>

        <Typography component="h3" variant="h5" sx={{ marginTop: "2rem" }}>
          What I have accomplished today:
        </Typography>
        <Box>
          <div className="todos">
            {todos
              .filter((todo) => todo.complete)
              .map((todo) => (
                <div className="todo-container">
                  <div className={"todo is-complete fade-in"} key={todo._id}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: "100%",
                        cursor: "pointer",
                      }}
                      onClick={() => completeTodo(todo._id)}
                    >
                      <div className="checkbox">
                        <CheckIcon sx={{ color: "#fff" }}></CheckIcon>
                      </div>

                      <div className="title">{todo.title}</div>
                    </Box>
                    <div
                      className="delete-todo"
                      onClick={() => deleteTodo(todo._id)}
                    >
                      <DeleteIcon></DeleteIcon>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </Box>
      </Box>
    </Box>
  );
}
