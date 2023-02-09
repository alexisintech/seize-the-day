import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Toolbar, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { quotes } from "../quotes";
import Header from "../components/Header";
import ResponsiveDrawer from "../components/ResponsiveDrawer";

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
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
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
    <Box
      sx={{
        display: "flex",
        position: "relative",
        height: "100vh",
        width: "100vW",
      }}
    >
      <ResponsiveDrawer />
      <main className="content">
        <Box m="135px 50px">
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Header title="PROFILE" subtitle="Welcome!" />
          </Box>
        </Box>
      </main>
    </Box>
  );
}
