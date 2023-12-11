import * as React from "react";
import {AppBar, Box, Toolbar, IconButton, Typography, Menu, Container, Avatar, Button, Tooltip , MenuItem, Divider } from "@mui/material/";
import { useNavigate } from "react-router-dom";
import AdbIcon from "@mui/icons-material/Adb";
import LeftBar from "./NavbarLeftSide";
import { useContext } from "react";
import { AuthContext } from "../../contexts/Contexts";
import Cookies from "js-cookie";

function ResponsiveAppBar() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const { loggedInUsername } = useContext(AuthContext);

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const logoutUser = async () => {
    try {
      Cookies.remove("jwt");
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />

          <LeftBar />

          <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            AQUAFIX
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {/* <Button
              onClick={() => navigate("/registeredusers")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <b> Authors </b>
            </Button> */}

            {/* <Button
              onClick={() => navigate("/dashboard")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <b> Blogs </b>
            </Button> */}

            <Button
              onClick={() => navigate("/enhance")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <b> ENHANCE </b>
            </Button>

            <Button
              onClick={() => navigate("/restore")}
              sx={{ my: 2, color: "white", display: "block" }}
            >
              <b> RESTORE </b>
            </Button>

          </Box>

     
          

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/src/assets/man.png" />
              </IconButton>
            </Tooltip>

            <Typography
              textAlign="center"
              variant="body1"
              sx={{ padding: 0, fontSize: "14px" }}
              onClick={() => navigate("/profile")}
            >
              <b>{loggedInUsername}</b>
            </Typography>

            <Menu
              sx={{ mt: "45px" }}
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
                  textAlign="left"
                  variant="body1"
                  sx={{ padding: 0, fontSize: "14px" }}
                  onClick={() => navigate("/dashboard")}
                >
                  <b> AQUAFIX</b>
                </Typography>
              </MenuItem>
              <Divider />
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  sx={{ padding: 0 }}
                  onClick={() => navigate("/profile")}
                >
                  PROFILE
                </Typography>
              </MenuItem>

        
              <MenuItem onClick={handleCloseUserMenu}>
                <Typography
                  textAlign="center"
                  sx={{ padding: 0 }}
                  onClick={() => logoutUser()}
                >
                  LOGOUT
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;