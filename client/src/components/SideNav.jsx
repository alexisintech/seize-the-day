import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

const drawerWidth = 350;

export default function SideNav() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: "border-box" },
      }}
    >
      <Toolbar />
      <Box sx={{ overflow: "auto", paddingTop: "3.5rem", paddingLeft: "1rem" }}>
        <List>
          {["Home", "All Tasks", "In Progress", "Completed"].map(
            (text, index) => (
              <ListItem key={text}>
                <ListItemButton>
                  <ListItemIcon sx={{ color: "#050448" }}>
                    {index === 0 ? (
                      <HomeIcon sx={{ height: "2.5rem", width: "2.5rem" }} />
                    ) : (
                      <RadioButtonUncheckedIcon
                        sx={{ height: "2.5rem", width: "2.5rem" }}
                      />
                    )}
                  </ListItemIcon>
                  <ListItemText primary={text} sx={{ color: "#050448" }} />
                </ListItemButton>
              </ListItem>
            )
          )}
        </List>
      </Box>
    </Drawer>
  );
}
