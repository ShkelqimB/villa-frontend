import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import api from "../../api";
import { useAuth } from "../../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import CustomizedSnackbars from "../../components/Snackbar";

function Copyright(props: any) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
}

const theme = createTheme();

const SignInSide = () => {
    const [openSnackBar, setOpenSnackBar] = React.useState(false);
    const [message, setMessage] = React.useState("");
    const navigate = useNavigate();
    const { login } = useAuth();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const option = {
            email: data.get("email"),
            password: data.get("password"),
        };
        try {
            const result: any = await api.login(option);
            login(result.data);
            navigate("/home");
        } catch (error: any) {
            setMessage(error.response.data);
            setOpenSnackBar(true);
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <CustomizedSnackbars open={openSnackBar} onClose={() => setOpenSnackBar(false)} severity={"error"} message={message} />
            <Grid container component="main" sx={{ height: "100vh" }}>
                <CssBaseline />
                <Grid
                    item
                    xs={false}
                    sm={4}
                    md={7}
                    sx={{
                        backgroundImage: "url(https://source.unsplash.com/random)",
                        backgroundRepeat: "no-repeat",
                        backgroundColor: (t) => (t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900]),
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
                <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
                    <Box
                        sx={{
                            my: 8,
                            mx: 4,
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                    >
                        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                            <LockOutlinedIcon />
                        </Avatar>
                        <Typography component="h1" variant="h5">
                            Sign in
                        </Typography>
                        <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <TextField margin="normal" required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
                            <TextField margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" />
                            <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
                            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                                Sign In
                            </Button>
                            <Copyright sx={{ mt: 5 }} />
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </ThemeProvider>
    );
};

export default SignInSide;
