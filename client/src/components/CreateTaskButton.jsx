import { Button, useTheme } from "@mui/material";
import { tokens } from "../theme";

const CreateTaskButton = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Button
      sx={{
        color: colors.grey[100],
        backgroundColor: colors.purpleAccent[500],
        padding: "0.5rem 1rem",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: colors.purpleAccent[400],
        },
      }}
    >
      Create New Task
    </Button>
  );
};

export default CreateTaskButton;
