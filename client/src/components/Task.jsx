import { useContext } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CheckIcon from "@mui/icons-material/Check";
import { AppContext } from "../AppContext";
import { tokens } from "../theme";
import { completeTodo, deleteTodo, completeSubtask } from "../utils";

const Task = ({ task, isCompleted }) => {
  const [state, dispatch] = useContext(AppContext);
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const iconStyles = {
    cursor: "pointer",
    width: "30px",
    height: "30px",
    borderRadius: "3px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1rem",
    transition: "0.4s",
    color: "white",
  };

  console.log(task);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        backgroundColor:
          theme.palette.mode === "dark" ? colors.primary[500] : "white",
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
          padding: "1rem 0.8rem",
          borderRadius: "5px",
        }}
        key={task._id}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Box
            className={isCompleted ? "is-completed checkbox" : "checkbox"}
            onClick={() =>
              completeTodo(task._id).then((res) => {
                dispatch({ type: "COMPLETE_TODO", payload: res });
              })
            }
            style={iconStyles}
            sx={{
              backgroundColor: isCompleted
                ? colors.purpleAccent[500]
                : colors.primary[400],
              "&:hover": {
                backgroundColor: isCompleted
                  ? `${colors.primary[400]} !important`
                  : `${colors.purpleAccent[500]} !important`,
                color: "white",
              },
            }}
          >
            {isCompleted && <CheckIcon />}
          </Box>
          <Typography key={task._id} sx={{ ml: 2 }}>
            {task.title}
          </Typography>
        </Box>
        <Box
          className="delete-todo"
          sx={{
            backgroundColor: colors.purpleAccent[500],
            "&:hover": { backgroundColor: "red !important", color: "white" },
          }}
          style={iconStyles}
        >
          <DeleteIcon
            onClick={() =>
              deleteTodo(task._id).then((res) => {
                dispatch({ type: "DELETE_TODO", payload: res });
              })
            }
          />
        </Box>
      </Box>
      {/* Subtasks */}
      <Box sx={{ pb: "0.8rem" }}>
        {task.subTasks.length > 0 &&
          task.subTasks.map((subTask, index) => (
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "0 3.5rem 0.5rem 3.5rem",
              }}
              key={index}
            >
              <Box
                className={
                  subTask.completed ? "is-completed checkbox" : "checkbox"
                }
                onClick={() =>
                  completeSubtask(task._id, subTask.title).then((res) => {
                    dispatch({ type: "COMPLETE_SUBTASKS", payload: res });
                  })
                }
                style={iconStyles}
                sx={{
                  backgroundColor: subTask.completed
                    ? colors.purpleAccent[500]
                    : colors.primary[400],
                  "&:hover": {
                    backgroundColor: subTask.completed
                      ? `${colors.primary[400]} !important`
                      : `${colors.purpleAccent[500]} !important`,
                    color: "white",
                  },
                }}
              >
                {subTask.completed && <CheckIcon />}
              </Box>
              <Typography key={index} sx={{ ml: 2 }}>
                {subTask.title}
              </Typography>
            </Box>
          ))}
      </Box>
    </Box>
  );
};

export default Task;
