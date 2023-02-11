import { useState, useContext, useEffect } from "react";
import { Box, Checkbox, Typography } from "@mui/material";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { AppContext } from "../AppContext";
import { getTodos, completeTodo, deleteTodo } from "../utils";
import Woops from "../pages/Woops";

const Tasks = ({ isCompleted }) => {
  const [state, dispatch] = useContext(AppContext);
  const [woops, setWoops] = useState(false);
  const tasks = state.tasks;
  let completedTasks = tasks.filter((task) => task.complete);
  let inProgressTasks = tasks.filter((task) => !task.complete);
  console.log(completedTasks);
  console.log(inProgressTasks);

  useEffect(() => {
    getTodos().then((res) => {
      dispatch({
        type: "GET_TODOS",
        payload: res,
      });
    });
  }, []);

  return (
    <Box>
      {isCompleted
        ? completedTasks.map((task) => (
            <Box sx={{ display: "flex" }} key={task._id}>
              <Checkbox
                color="secondary"
                onClick={() =>
                  completeTodo(task._id).then((res) => {
                    dispatch({ type: "COMPLETE_TODO", payload: res });
                  })
                }
              />
              <Typography key={task._id}>{task.title}</Typography>
              <DeleteOutlineOutlinedIcon
                onClick={() =>
                  deleteTodo(task._id).then((res) => {
                    dispatch({ type: "DELETE_TODO", payload: res });
                  })
                }
              />
            </Box>
          ))
        : inProgressTasks.map((task) => (
            <Box sx={{ display: "flex" }} key={task._id}>
              <Checkbox
                defaultChecked
                color="secondary"
                onClick={() =>
                  completeTodo(task._id).then((res) => {
                    dispatch({ type: "COMPLETE_TODO", payload: res });
                  })
                }
              />
              <Typography key={task._id}>{task.title}</Typography>
              <DeleteOutlineOutlinedIcon
                onClick={() =>
                  deleteTodo(task._id).then((res) => {
                    dispatch({ type: "DELETE_TODO", payload: res });
                  })
                }
              />
            </Box>
          ))}
    </Box>
  );
};

const api_base =
  process.env.NODE_ENV === "development"
    ? "http://localhost:2222"
    : "https://seize-the-day-api.up.railway.app";

export default Tasks;
