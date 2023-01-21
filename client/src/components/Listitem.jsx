import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LabelIcon from "@mui/icons-material/Label";
import Typography from "@mui/material/Typography";

export default function Listitem(props) {
  return (
    <ListItem>
      <ListItemButton>
        <ListItemIcon sx={{ color: "#050448" }}>
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
            color: "#050448",
            textTransform: "uppercase",
            "& .MuiTypography-root": {
              fontWeight: 700,
            },
          }}
        />
        {props.text === "Lists" && (
          <Typography
            sx={{
              color: "rgb(62, 62, 62, 0.5)",
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
              color: "rgb(62, 62, 62, 0.5)",
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
