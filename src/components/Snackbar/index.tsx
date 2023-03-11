import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";

type Props = {
    onClose: any;
    severity: AlertColor;
    message: string;
    open: boolean;
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function CustomizedSnackbars({ open, onClose, severity, message }: Props) {
    return (
        <Snackbar anchorOrigin={{ vertical: "bottom", horizontal: "center" }} open={open} autoHideDuration={6000} onClose={onClose}>
            <Alert onClose={onClose} severity={severity} sx={{ width: "100%" }}>
                {message}
            </Alert>
        </Snackbar>
        // <Alert severity="error">This is an error message!</Alert>
        // <Alert severity="warning">This is a warning message!</Alert>
        // <Alert severity="info">This is an information message!</Alert>
        // <Alert severity="success">This is a success message!</Alert>
    );
}
