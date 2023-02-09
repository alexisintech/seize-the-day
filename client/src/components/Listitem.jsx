import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import { tokens } from "../theme";

export default function Listitem(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ListItem>
      <ListItemButton>
        <ListItemIcon sx={{ color: colors.grey[100] }}>
          {props.text === "Home" && (
            <HomeOutlinedIcon sx={{ height: "1.5rem", width: "1.5rem" }} />
          )}
          {props.text === "Lists" && (
            <ListOutlinedIcon sx={{ height: "1.5rem", width: "1.5rem" }} />
          )}
          {props.text === "Tags" && (
            <LabelOutlinedIcon sx={{ height: "1.5rem", width: "1.5rem" }} />
          )}
        </ListItemIcon>
        <ListItemText
          primary={props.text}
          sx={{
            color: colors.grey[100],
          }}
        />
        {props.text === "Lists" && (
          <Typography
            sx={{
              color: colors.grey[300],
              fontSize: "0.9rem",
              fontStyle: "italic",
            }}
          >
            Coming soon...
          </Typography>
        )}
        {props.text === "Tags" && (
          <Typography
            sx={{
              color: colors.grey[300],
              fontSize: "0.9rem",
              fontStyle: "italic",
            }}
          >
            Coming soon...
          </Typography>
        )}
      </ListItemButton>
    </ListItem>
  );
}
