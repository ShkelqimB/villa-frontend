// REACT
import { useState, useEffect } from "react";
// Material UI
import { Button, Checkbox, Container, Divider, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, OutlinedInput, TextField, Typography } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import EditIcon from "@mui/icons-material/Edit";
import moment from "moment";

// Components
import { Client_RollPayment } from "../../interfaces/rollPayment.interface";
import api from "../../api";
import { Villa } from "../../interfaces/villa.interface";
import "./booking.css";

const Booking = () => {
    const [fullValues, setFullValues] = useState<Client_RollPayment>({
        id: +"",
        amount: +"",
        guests: +"",
        checkin: "",
        checkout: "",
        client: { full_name: "", email: "", phone: "", guests: +"" },
        villa: { id: +"", name: "", price: +"", guests: +"" },
    });

    const [editPrice, setEditPrice] = useState(false);
    const [villas, setVillas] = useState([]);

    const getVillas = async () => {
        const result = await api.getAllVillas();
        setVillas(result.data);
    };

    const handleChangeDateCheckin = (newValue: any) => {
        setFullValues((values) => ({
            ...values,
            checkin: newValue,
        }));
    };

    const handleChangeDateCheckout = (newValue: any) => {
        setFullValues((values) => ({
            ...values,
            checkout: newValue,
        }));
    };

    const handleChangeText = (event: { persist: () => void; target: { name: any; value: any } }) => {
        event.persist();
        setFullValues((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };

    const handleChangeClient = (event: { persist: () => void; target: { name: any; value: any } }) => {
        event.persist();
        setFullValues((values) => ({
            ...values,
            client: {
                ...values.client,
                [event.target.name]: event.target.value,
            },
        }));
    };

    const handleClickVilla = (value: Villa) => {
        setFullValues({ ...fullValues, villa: value });
    };

    useEffect(() => {
        getVillas();
    }, []);
    return (
        <Container maxWidth="lg">
            <Typography variant="h3">Select Villa</Typography>
            <Divider />
            <Grid container spacing={2} style={{ marginTop: 10 }}>
                {villas.length > 0 &&
                    villas.map((row: Villa, index) => {
                        return (
                            <Grid
                                style={{
                                    background: "#0092D7 0% 0% no-repeat padding-box",
                                    boxShadow: "0px 3px 6px #00000029",
                                    borderRadius: 19,
                                    opacity: 1,
                                    margin: "2%",
                                    textAlign: "center",
                                    width: 200,
                                    padding: 20,
                                }}
                                onClick={() => handleClickVilla(row)}
                                key={index}
                            >
                                <Grid item xs={12}>
                                    <Typography variant="h4" color="white" fontWeight={"bold"}>
                                        {row.name}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5" color="white">
                                        {row.price} per day
                                    </Typography>
                                </Grid>
                            </Grid>
                        );
                    })}
            </Grid>
            <Divider />
            <Typography variant="h3">Select Date</Typography>
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
                            <DateTimePicker
                                className="dateTimeMargin"
                                onChange={handleChangeDateCheckout}
                                value={moment(fullValues.checkout)}
                                label="Checkout Date&Time"
                                format="YYYY-MM-DD HH:mm:ss"
                            />
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
                            <TextField autoFocus margin="dense" id="name" label="Price" type="number" name="price" variant="outlined" onChange={handleChangeText} value={fullValues.villa.price} />
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
            <Divider />
            <Typography variant="h3">Client Information</Typography>
            <Grid>
                <TextField margin="dense" id="full_name" label="Full Name" type="text" name="full_name" variant="outlined" onChange={handleChangeClient} value={fullValues.client?.full_name} />
                <TextField
                    style={{ marginLeft: "3%" }}
                    margin="dense"
                    id="phone"
                    label="Phone"
                    type="number"
                    name="phone"
                    variant="outlined"
                    onChange={handleChangeClient}
                    value={fullValues.client?.phone}
                />
            </Grid>
            <Grid>
                <TextField margin="dense" id="email" label="Email" type="email" name="email" variant="outlined" onChange={handleChangeClient} value={fullValues.client?.email} />
                <TextField
                    style={{ marginLeft: "3%" }}
                    margin="dense"
                    id="guests"
                    label="Number of Guests"
                    type="number"
                    name="guests"
                    variant="outlined"
                    onChange={handleChangeText}
                    value={fullValues.client.guests}
                />
            </Grid>
            <Grid>
                <FormControlLabel control={<Checkbox defaultChecked />} label="No prepayment" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Deposit" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Full Prepayment" />
            </Grid>
            <FormControl fullWidth sx={{ m: 1, width: 300 }}>
                <InputLabel>Amount</InputLabel>
                <OutlinedInput
                    id="amount"
                    name="amount"
                    type="number"
                    label="Amount"
                    onChange={handleChangeText}
                    value={fullValues.amount}
                    endAdornment={<InputAdornment position="start">$</InputAdornment>}
                />
            </FormControl>
            <Divider />
            <Button variant="contained" color="primary" onClick={() => console.log("fullValues: ", fullValues)}>
                Add Booking
            </Button>
        </Container>
    );
};

export default Booking;
