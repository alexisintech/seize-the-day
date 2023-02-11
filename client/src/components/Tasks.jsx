import { Box, Typography } from "@mui/material";

const Tasks = ({ tasks }) => {
  return (
    <Box>
      {tasks.map((task) => (
        <Typography key={task._id}>{task.title}</Typography>
      ))}
    </Box>
  );
};

export default Tasks;
