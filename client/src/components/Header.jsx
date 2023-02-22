import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";
import CreateTaskButton from "../components/CreateTaskButton";

const Header = ({ title, subtitle, profile }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: { xs: "center", md: "space-between" },
        mb: { xs: "50px", md: "30px" },
        textAlign: { xs: "center", md: "left" },
      }}
    >
      <Box display="flex" flexDirection="column">
        <Typography
          variant="h2"
          color={colors.grey[100]}
          fontWeight="bold"
          sx={{ m: "0 0 5px 0" }}
        >
          {title}
        </Typography>
        <Typography variant="h5" color={colors.purpleAccent[400]}>
          {subtitle}
        </Typography>
      </Box>
      {!profile && <CreateTaskButton />}
    </Box>
  );
};

export default Header;
