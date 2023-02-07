import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import Listitem from "./Listitem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import CreateIcon from "@mui/icons-material/Create";

const drawerWidth = 300;

export default function ResponsiveDrawer(props) {
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { window } = props;
  const navigate = useNavigate();

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    localStorage.clear();

    navigate("/");
  };

  const drawerContent = (
    <div>
      <Toolbar />
      <Box sx={{ overflow: "auto", paddingTop: "3.5rem", paddingLeft: "1rem" }}>
        <List>
          <Listitem text="Home" />
          <Listitem text="Lists" />
          <Listitem text="Tags" />
        </List>
      </Box>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          backgroundColor: "#fff",
          padding: "0.5rem 1.5rem",
        }}
      >
        <Container maxWidth="2000px" sx={{ margin: 0 }}>
          <Toolbar
            disableGutters
            sx={{ justifyContent: { xs: "space-between", sm: "none" } }}
          >
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "none" },
              }}
            >
              <MenuIcon
                sx={{ color: "#03015d", height: "2.5rem", width: "2.5rem" }}
              />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CreateIcon
                sx={{
                  display: "flex",
                  mr: 1,
                  color: "#03015d",
                  height: { xs: "2rem", sm: "2.5rem" },
                  width: { xs: "2rem", sm: "2.5rem" },
                }}
              />
              <Typography
                variant="h1"
                noWrap
                component="a"
                href=""
                sx={{
                  mr: 2,
                  display: "flex",
                  fontWeight: 700,
                  fontSize: { xs: "1.2rem", sm: "1.5rem" },
                  color: "#03015d",
                  textDecoration: "none",
                }}
              >
                SEIZE THE DAY
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 0, display: "flex" }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="person icon"
                    sx={{
                      backgroundColor: "#03015d",
                      width: { xs: "2rem", sm: "3rem" },
                      height: { xs: "2rem", sm: "3rem" },
                    }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "55px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography
                    textAlign="center"
                    href="/logout"
                    onClick={logout}
                  >
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>

      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawerContent}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawerContent}
        </Drawer>
      </Box>
    </Box>
  );
}
