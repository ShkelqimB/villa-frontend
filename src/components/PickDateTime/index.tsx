import { Button, Grid, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";
import { useState } from "react";

const PickDateTime = ({ fullValues, setFullValues }: any) => {
    const [editPrice, setEditPrice] = useState(false);

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

    const handleChangeText = (event: { persist: () => void; target: { name: any; value: any } }) => {
        event.persist();
        setFullValues((values: any) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };

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
                {!editPrice ? (
                    <Grid
                        style={{
                            textAlign: "center",
                            width: "100%",
                            padding: 20,
                            alignItems: "center",
                            background: "#FFFFFF 0% 0% no-repeat padding-box",
                            boxShadow: "0px 3px 6px #00000029",
                            borderRadius: 19,
                            opacity: 1,
                            alignSelf: "center",
                        }}
                        container
                        spacing={2}
                    >
                        <Typography variant="h4" fontWeight={"bold"} style={{ whiteSpace: "normal" }}>
                            {fullValues.villa.price} Total Price
                        </Typography>
                        <Button color="primary" onClick={() => setEditPrice(true)} endIcon={<EditIcon />}>
                            Edit Price
                        </Button>
                    </Grid>
                ) : (
                    <Grid
                        style={{
                            textAlign: "center",
                            width: "100%",
                            padding: 20,
                            alignItems: "center",
                            background: "#FFFFFF 0% 0% no-repeat padding-box",
                            boxShadow: "0px 3px 6px #00000029",
                            borderRadius: 19,
                            opacity: 1,
                            alignSelf: "center",
                        }}
                        container
                    >
                        <TextField autoFocus margin="dense" id="name" label="Price" type="number" name="price" variant="outlined" onChange={handleChangeText} value={fullValues?.villa?.price} />
                        <Button color="primary" onClick={() => setEditPrice(false)}>
                            Edit Price
                        </Button>
                        <Button color="error" onClick={() => setEditPrice(false)}>
                            Cancel
                        </Button>
                    </Grid>
                )}
            </Grid>
        </Grid>
    );
};

export default PickDateTime;
