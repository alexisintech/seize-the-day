import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import { tokens } from "../theme";

export default function Listitem(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <Link to={props.to} style={{ textDecoration: "none" }}>
      <ListItem>
        <ListItemButton>
          <ListItemIcon
            sx={{ color: colors.grey[100], height: "1.5rem", width: "1.5rem" }}
          >
            {props.icon}
          </ListItemIcon>
          <ListItemText
            primary={props.text}
            sx={{
              color: colors.grey[100],
            }}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
}
