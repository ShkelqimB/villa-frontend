import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import routes from "../../routes/routes";
import { useAuth } from "../../context/AuthProvider";
import Logo from "../../assets/logo.svg";

const Navbar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };

    const LinkRedirect = (path: string) => {
        setAnchorElNav(null);
        navigate(path);
    };

    const handleLogout = async () => {
        localStorage.removeItem("jwt");
        logout();
    };

    return (
        <AppBar position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Typography
                        variant="h6"
                        noWrap
                        component="a"
                        href="/"
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
                        <img src={Logo} alt="logo" style={{ width: 60, height: 60, margin: 10 }} />
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
                        <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
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
                            onClose={() => setAnchorElNav(null)}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {routes.AdminLinks.map((page, index) => (
                                <MenuItem key={index} onClick={() => LinkRedirect(page.path)}>
                                    <Typography textAlign="center">{page.name}</Typography>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <Box sx={{ display: { xs: "flex", md: "none" }, marginTop: 1, marginBottom: 1, flexGrow: 1 }}>
                        <img src={Logo} alt="logo" style={{ width: 70, height: 70 }} />
                    </Box>
                    <>
                        <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
                            {routes.AdminLinks.map((res, index) => (
                                <Button key={index} onClick={() => LinkRedirect(res.path)} sx={{ my: 2, color: "white", display: "block" }}>
                                    {res.name}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                                </IconButton>
                            </Tooltip>
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
                                onClose={() => setAnchorElUser(null)}
                            >
                                <MenuItem onClick={() => handleLogout()}>
                                    <Typography textAlign="center">Logout</Typography>
                                </MenuItem>
                            </Menu>
                        </Box>
                    </>
                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
