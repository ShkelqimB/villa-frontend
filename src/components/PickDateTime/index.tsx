import { Grid, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";

const PickDateTime = ({ fullValues, setFullValues }: any) => {
    const handleChangeDateCheckin = (newValue: any) => {
        setFullValues((values: any) => ({
            ...values,
            checkin: moment(newValue).format(),
        }));
    };

    const handleChangeDateCheckout = (newValue: any) => {
        setFullValues((values: any) => ({
            ...values,
            checkout: moment(newValue).format(),
        }));
    };

    var a = moment(fullValues.checkin);
    var b = moment(fullValues.checkout);
    const kk = Math.abs(a.diff(b, "days"));
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker onChange={handleChangeDateCheckin} value={moment(fullValues.checkin)} label="Checkin Date&Time" format="YYYY-MM-DD HH:mm:ss" />
                    </DemoContainer>
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={4}>
                <LocalizationProvider dateAdapter={AdapterMoment}>
                    <DemoContainer components={["DateTimePicker"]}>
                        <DateTimePicker className="dateTimeMargin" onChange={handleChangeDateCheckout} value={moment(fullValues.checkout)} label="Checkout Date&Time" format="YYYY-MM-DD HH:mm:ss" />
                    </DemoContainer>
                </LocalizationProvider>
            </Grid>
            <Grid item xs={12} md={4} display="flex">
                <Typography variant="h4" fontWeight={"bold"} style={{ whiteSpace: "normal" }}>
                    {kk * fullValues.villa.price || fullValues.villa.price} Total Price
                </Typography>
            </Grid>
        </Grid>
    );
};

export default PickDateTime;
