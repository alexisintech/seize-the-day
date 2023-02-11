import { useContext, useEffect } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { tokens } from "../theme";
import { AppContext } from "../AppContext";
import { getTodos } from "../utils";
import Task from "./Task";

const Tasks = ({ isCompleted }) => {
  const [state, dispatch] = useContext(AppContext);
  const tasks = state.tasks;
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  let completedTasks = tasks.filter((task) => task.complete);
  let inProgressTasks = tasks.filter((task) => !task.complete);

  useEffect(() => {
    getTodos().then((res) => {
      dispatch({
        type: "GET_TODOS",
        payload: res,
      });
    });
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: colors.primary[400],
        padding: "1.5rem",
        borderRadius: "10px",
        gap: 2,
        marginTop: 2,
      }}
    >
      {isCompleted ? (
        completedTasks.length > 0 ? (
          completedTasks.map((task) => (
            <Task task={task} key={task._id} isCompleted={true} />
          ))
        ) : (
          <Typography
            sx={{
              fontStyle: "italic",
              color:
                theme.palette.mode === "dark"
                  ? colors.primary[200]
                  : colors.primary[800],
            }}
          >
            No finished tasks...yet!
          </Typography>
        )
      ) : inProgressTasks.length > 0 ? (
        inProgressTasks.map((task) => (
          <Task task={task} key={task._id} isCompleted={false} />
        ))
      ) : (
        <Typography
          sx={{
            fontStyle: "italic",
            color:
              theme.palette.mode === "dark"
                ? colors.primary[200]
                : colors.primary[800],
          }}
        >
          You currently have no tasks in progress!
        </Typography>
      )}
    </Box>
  );
};

const api_base =
  process.env.NODE_ENV === "development"
    ? "http://localhost:2222"
    : "https://seize-the-day-api.up.railway.app";

export default Tasks;
