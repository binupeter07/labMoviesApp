import { useState, MouseEvent, useContext } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";
import MenuIcon from "@mui/icons-material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import { useNavigate } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { MoviesContext } from "../contexts/moviesContext";
import MovieIcon from "@mui/icons-material/Movie";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

const SiteHeader = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));
  const { isAuthenticated, logout } = useContext(MoviesContext);

  const menuOptions = [
    { label: "Home", path: "/" },
    { label: "Favorites", path: "/movies/favourites" },
    { label: "Upcoming", path: "/movies/upcoming" },
    { label: "Trending", path: "/movies/trending" },
    { label: "Now Playing", path: "/movies/nowplaying" },
    { label: "Actors", path: "/actors" },
    { label: "My Fantasy Movies", path: "/movies/fantasy/list" },
    { label: "Playlists", path: "/playlists" },
  ];

  const handleMenuSelect = (pageURL: string) => {
    navigate(pageURL);
  };

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      logout();
      navigate("/");
    } else {
      navigate("/login");
    }
  };

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background: "linear-gradient(to right, #000000, #1a1a2e)",
          borderBottom: "2px solid #e50914",
        }}
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <MovieIcon sx={{ color: "#e50914", mr: 1, fontSize: 35 }} />
            <Typography
              variant="h5"
              sx={{
                fontWeight: "bold",
                color: "#e50914",
                letterSpacing: 2,
                cursor: "pointer",
              }}
              onClick={() => navigate("/")}
            >
              MovieHub
            </Typography>
          </Box>

          {isMobile ? (
            <>
              <IconButton
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                sx={{ color: "white" }}
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={open}
                onClose={() => setAnchorEl(null)}
                PaperProps={{
                  sx: {
                    backgroundColor: "#1a1a2e",
                    color: "white",
                  },
                }}
              >
                {menuOptions.map((opt) => (
                  <MenuItem
                    key={opt.label}
                    onClick={() => handleMenuSelect(opt.path)}
                    sx={{ "&:hover": { color: "#e50914" } }}
                  >
                    {opt.label}
                  </MenuItem>
                ))}
                <MenuItem
                  onClick={handleAuthAction}
                  sx={{ color: "#e50914", fontWeight: "bold" }}
                >
                  {isAuthenticated ? "Logout" : "Login"}
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {menuOptions.map((opt) => (
                <Button
                  key={opt.label}
                  onClick={() => handleMenuSelect(opt.path)}
                  sx={{
                    color: "white",
                    fontSize: "0.75rem",
                    "&:hover": {
                      color: "#e50914",
                      backgroundColor: "transparent",
                    },
                  }}
                >
                  {opt.label}
                </Button>
              ))}
              <Button
                onClick={handleAuthAction}
                sx={{
                  ml: 2,
                  color: "white",
                  backgroundColor: "#e50914",
                  fontWeight: "bold",
                  "&:hover": {
                    backgroundColor: "#b20710",
                  },
                }}
              >
                {isAuthenticated ? "Logout" : "Login"}
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>
      <Offset />
    </>
  );
};

export default SiteHeader;