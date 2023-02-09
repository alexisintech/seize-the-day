import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { ColorModeContext, tokens } from "../theme";
import {
  AppBar,
  Box,
  CssBaseline,
  Container,
  Drawer,
  IconButton,
  List,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Listitem from "./Listitem";
import MenuIcon from "@mui/icons-material/Menu";
import CreateIcon from "@mui/icons-material/Create";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
import LabelOutlinedIcon from "@mui/icons-material/LabelOutlined";
import AppsIcon from "@mui/icons-material/Apps";
import TaskOutlinedIcon from "@mui/icons-material/TaskOutlined";
import CachedOutlinedIcon from "@mui/icons-material/CachedOutlined";

const drawerWidth = 300;

export default function ResponsiveDrawer(props) {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [mobile, setMobile] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { window } = props;
  const navigate = useNavigate();

  const mobileScreen = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    if (mobileScreen) {
      setMobile(true);
    }
  }, []);

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
      <Box
        sx={{
          overflow: "auto",
          paddingTop: "2.5rem",
          paddingLeft: { xs: 0, sm: "1rem" },
        }}
      >
        {/* SIDEBAR MENU ITEMS */}
        <List>
          <Listitem text="Profile" to="/profile" icon={<HomeOutlinedIcon />} />

          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
          >
            Tasks
          </Typography>
          <Listitem text="All" to="/all" icon={<AppsIcon />} />
          <Listitem
            text="Completed"
            to="/completed"
            icon={<TaskOutlinedIcon />}
          />
          <Listitem
            text="InProgress"
            to="/inprogress"
            icon={<CachedOutlinedIcon />}
          />

          <Typography
            variant="h6"
            color={colors.grey[300]}
            sx={{ m: "15px 0 5px 20px" }}
          >
            Organize
          </Typography>
          <Listitem text="Lists" to="/lists" icon={<ListOutlinedIcon />} />
          <Listitem text="Tags" to="/tags" icon={<LabelOutlinedIcon />} />
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
        sx={{
          backgroundColor: colors.primary[400],
          zIndex: (theme) => theme.zIndex.drawer + 1,
          padding: { xs: "0.3rem", sm: "0.5rem 1.5rem" },
          backgroundImage: "none",
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
                color: colors.grey[100],
                display: { sm: "none" },
              }}
            >
              <MenuIcon
                sx={{
                  height: { xs: "1.5rem", sm: "2.5rem" },
                  width: { xs: "1.5rem", sm: "2.5rem" },
                }}
              />
            </IconButton>
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <CreateIcon
                sx={{
                  display: "flex",
                  mr: { xs: "0.3rem", sm: "0.5rem" },
                  color: colors.grey[100],
                  height: { xs: "1.5rem", sm: "2rem" },
                  width: { xs: "1.5rem", sm: "2rem" },
                }}
              />
              <Typography
                variant="h1"
                noWrap
                sx={{
                  mr: 2,
                  display: "flex",
                  color: colors.grey[100],
                  fontSize: { xs: "1rem", sm: "1.5rem" },
                  textDecoration: "none",
                }}
              >
                SEIZE THE DAY
              </Typography>
            </Box>

            <Box sx={{ flexGrow: 0, display: "flex" }}>
              <Tooltip title="Change mode">
                <IconButton
                  onClick={colorMode.toggleColorMode}
                  sx={{ px: { xs: 0, sm: 2 } }}
                >
                  {theme.palette.mode === "dark" ? (
                    <DarkModeOutlinedIcon
                      sx={{
                        height: { xs: "1.2rem", sm: "1.5rem" },
                        width: { xs: "1.2rem", sm: "1.5rem" },
                      }}
                    />
                  ) : (
                    <LightModeOutlinedIcon
                      sx={{
                        height: { xs: "1.2rem", sm: "1.5rem" },
                        width: { xs: "1.2rem", sm: "1.5rem" },
                      }}
                    />
                  )}
                </IconButton>
              </Tooltip>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu}>
                  <PersonOutlinedIcon
                    sx={{
                      height: { xs: "1.2rem", sm: "1.5rem" },
                      width: { xs: "1.2rem", sm: "1.5rem" },
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
              backgroundColor: colors.primary[800],
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
              backgroundColor: colors.primary[400],
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
