import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LabelIcon from "@mui/icons-material/Label";
import { tokens } from "../theme";

export default function Listitem(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <ListItem>
      <ListItemButton>
        <ListItemIcon sx={{ color: colors.grey[100] }}>
          {props.text === "Home" && (
            <HomeIcon sx={{ height: "2.5rem", width: "2.5rem" }} />
          )}
          {props.text === "Lists" && (
            <FormatListBulletedIcon
              sx={{ height: "2.5rem", width: "2.5rem" }}
            />
          )}
          {props.text === "Tags" && (
            <LabelIcon sx={{ height: "2.5rem", width: "2.5rem" }} />
          )}
        </ListItemIcon>
        <ListItemText
          primary={props.text}
          sx={{
            color: colors.grey[100],
            textTransform: "uppercase",
            "& .MuiTypography-root": {
              fontWeight: 700,
            },
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
