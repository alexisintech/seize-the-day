import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Listitem from "./Listitem";

const drawerWidth = 300;

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
          <Listitem text="Home" />
          <Listitem text="Lists" />
          <Listitem text="Tags" />
        </List>
      </Box>
    </Drawer>
  );
}
