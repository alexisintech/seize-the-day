import { useState, useContext, useEffect } from "react";
import { Box, Checkbox, Typography } from "@mui/material";
import { AppContext } from "../AppContext";
import { getTodos, completeTodo, deleteTodo } from "../utils";

const Tasks = ({ isCompleted }) => {
  const [state, dispatch] = useContext(AppContext);
  const tasks = state.tasks;
  let completedTasks = tasks.filter((task) => task.complete);
  let inProgressTasks = tasks.filter((task) => !task.complete);
  console.log(completedTasks);
  console.log(inProgressTasks);

  useEffect(() => {
    getTodos().then((res) => {
      console.log("This is the res from getTodos", res);
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
            <Box sx={{ display: "flex" }}>
              <Checkbox
                color="secondary"
                onClick={() =>
                  completeTodo(task._id).then((res) => {
                    dispatch({ type: "COMPLETE_TODO", payload: res });
                  })
                }
              />
              <Typography key={task._id}>{task.title}</Typography>
            </Box>
          ))
        : inProgressTasks.map((task) => (
            <Box sx={{ display: "flex" }}>
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
