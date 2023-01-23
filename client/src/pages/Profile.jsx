import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Appbar from "../components/Appbar";
import SideNav from "../components/SideNav";
import ResponsiveDrawer from "../components/ResponsiveDrawer";
import { Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { useNavigate } from "react-router-dom";
import { quotes } from "../quotes";

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
  const [newTodo, setNewTodo] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
    getTodos();
  }, []);

  useEffect(() => {
    setDay(todaysDate().day);
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

        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: { xs: "center", sm: "space-between" },
            alignItems: "center",
          }}
        >
          <Typography
            component="h2"
            variant="h2"
            sx={{ fontWeight: 700, fontSize: { xs: "2rem", sm: "2.5rem" } }}
          >
            Welcome, {user}!
          </Typography>

          <Box sx={{ display: { sm: "none" } }}>
            <div
              className="mobile addPopup"
              onClick={() => setPopupActive(true)}
            >
              +
            </div>
          </Box>
          <Box
            className="addPopup"
            sx={{ display: { xs: "none", sm: "inherit" } }}
            onClick={() => setPopupActive(true)}
          >
            + New Task
          </Box>

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

        <Typography
          variant="h6"
          sx={{ fontStyle: "italic", textAlign: { xs: "center", sm: "left" } }}
        >
          {todaysDate().dateWithString}
        </Typography>

        <Typography sx={{ textAlign: { xs: "center", sm: "left" }, mt: 1 }}>
          "{quote}"
        </Typography>

        <Typography
          component="h3"
          variant="h5"
          sx={{ marginTop: "3rem", fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
        >
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

        <Typography
          component="h3"
          variant="h5"
          sx={{ marginTop: "2rem", fontSize: { xs: "1.2rem", sm: "1.5rem" } }}
        >
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
