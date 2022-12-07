import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Appbar from "../components/Appbar";
import SideNav from "../components/SideNav";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import { getUser } from "../../../api/controllers/auth";

const api_base =
  process.env.NODE_ENV === "development"
    ? "http://localhost:2222"
    : "replace with railway URL";

const date = new Date();
const day = date.getDate();
const options = { month: "long" };
const year = date.getFullYear();
const monthAsString = new Intl.DateTimeFormat("en-US", options).format(date);
const currentDate = `${monthAsString} ${day}, ${year}`;

export default function Profile() {
  const [user, setUser] = useState("");
  const [todos, setTodos] = useState([]);
  const [popupActive, setPopupActive] = useState(false);
  const [newTodo, setNewTodo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
    getTodos();
  }, []);

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
        text: newTodo,
      }),
    }).then((res) => res.json());

    console.log(data);

    setTodos([...todos, data]);

    setPopupActive(false);
    setNewTodo("");
  };

  const deleteTodo = async (id) => {
    const token = localStorage.getItem("auth");
    const data = await fetch(api_base + "/profile/delete/" + id, {
      method: "DELETE",
      headers: { authorization: `bearer ${token}` },
    }).then((res) => res.json());

    setTodos((todos) => todos.filter((todo) => todo._id !== data.result._id));
  };

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      <Appbar />
      <SideNav />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          paddingTop: 10,
          paddingBottom: 10,
          paddingLeft: 8,
          paddingRight: 5,
        }}
        className="main--container"
      >
        <Toolbar />

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component="h2" variant="h2" sx={{ fontWeight: 700 }}>
            Welcome, user!
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
                <h3>Add Task</h3>
                <input
                  type="text"
                  className="add-todo-input"
                  onChange={(e) => setNewTodo(e.target.value)}
                  value={newTodo}
                />
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
          {currentDate}
        </Typography>

        <Typography></Typography>

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

                        <div className="text">{todo.text}</div>
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

                      <div className="text">{todo.text}</div>
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
