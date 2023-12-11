import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";


export default function LeftSide() {
  const navigate = useNavigate();
  
    const [anchorElNav, setAnchorElNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
      };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
      };

    return (
        <>
       <Typography
            variant="h6"
            noWrap
            component="a"
            onClick={() => navigate("/")}
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            AQUAFIX
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="navbar navbar-dark bg-dark"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="left"
                  variant="body1"
                  sx={{ padding: 0, fontSize: "14px" }}
                  onClick={() => navigate("/dashboard")}
                >
                  {" "}
                  Dashboard
                </Typography>
              </MenuItem>
              <Divider />
      

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  sx={{ padding: 0 }}
                  onClick={() => navigate("/blogs/create")}
                >
                  ENHANCE
                </Typography>
              </MenuItem>

              <MenuItem onClick={handleCloseNavMenu}>
                <Typography
                  textAlign="center"
                  sx={{ padding: 0 }}
                  onClick={() => navigate("/blogs/create")}
                >
                  RESTORE
                </Typography>
              </MenuItem>


            </Menu>
          </Box> 
        </>
    );
}