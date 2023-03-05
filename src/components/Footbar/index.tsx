import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

const Copyright = () => {
    return (
        <Typography variant="body2" color="text.secondary">
            {"Copyright © "}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{" "}
            {new Date().getFullYear()}
            {"."}
        </Typography>
    );
};

const Footbar = () => {
    return (
        <div>
            <div style={{ display: "block", padding: "20px", height: "60px", width: "100%" }} />
            <div
                style={{
                    backgroundColor: "white",
                    fontSize: "20px",
                    color: "white",
                    borderTop: "1px solid #E7E7E7",
                    textAlign: "center",
                    padding: "20px",
                    position: "fixed",
                    left: "0",
                    bottom: "0",
                    height: "30px",
                    width: "100%",
                }}
            >
                <Copyright />
            </div>
        </div>
    );
};

export default Footbar;
