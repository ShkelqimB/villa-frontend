import { Button, Checkbox, Container, Divider, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, OutlinedInput, Stack, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../../api";
import { Villa } from "../../interfaces/villa.interface";
import { DesktopDatePicker, LocalizationProvider, TimePicker } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment, { Moment } from "moment";
import EditIcon from "@mui/icons-material/Edit";

const Booking = () => {
    const [value, setValue] = useState<Moment | null>(moment("2014-08-18T21:11:54"));
    const [price, setPrice] = useState<any>();
    const [editPrice, setEditPrice] = useState(false);

    const [villas, setVillas] = useState([]);
    const getVillas = async () => {
        const result = await api.getAllVillas();
        console.log("🚀 ~ file: index.tsx:8 ~ getVillas ~ result", result.data);
        setVillas(result.data);
    };

    const handleChange = (newValue: Moment | null) => {
        setValue(newValue);
    };

    const handleOnChange = (event: { persist: () => void; target: { name: any; value: any } }) => {
        setPrice(event.target.value);
    };

    useEffect(() => {
        getVillas();
    }, []);
    return (
        <Container maxWidth="lg">
            <Typography variant="h3">Select Villa</Typography>
            <Divider />
            <Grid container spacing={2}>
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
            <Stack direction={"row"}>
                <Stack spacing={3} margin={"2%"}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <DesktopDatePicker
                            label="From"
                            inputFormat="MM/DD/YYYY"
                            value={value}
                            onChange={handleChange}
                            renderInput={(params: any) => <TextField {...params} style={{ width: 300 }} />}
                        />
                        <DesktopDatePicker label="To" inputFormat="MM/DD/YYYY" value={value} onChange={handleChange} renderInput={(params: any) => <TextField {...params} style={{ width: 300 }} />} />
                    </LocalizationProvider>
                </Stack>
                <Stack spacing={3} margin={"2%"}>
                    <LocalizationProvider dateAdapter={AdapterMoment}>
                        <TimePicker label="Time" value={value} onChange={handleChange} renderInput={(params) => <TextField {...params} style={{ width: 300 }} />} />
                        <TimePicker label="Time" value={value} onChange={handleChange} renderInput={(params) => <TextField {...params} style={{ width: 300 }} />} />
                    </LocalizationProvider>
                </Stack>
                <Stack
                    margin={"2%"}
                    padding="2%"
                    spacing={2}
                    direction="row"
                    style={{ textAlign: "center", alignItems: "center", background: "#FFFFFF 0% 0% no-repeat padding-box", boxShadow: "0px 3px 6px #00000029", borderRadius: 19, opacity: 1 }}
                >
                    {!editPrice ? (
                        <>
                            {/* <Typography variant="h4" fontWeight={"bold"}>
                                    350
                                </Typography> */}
                            <Typography variant="h4" fontWeight={"bold"} style={{ whiteSpace: "normal" }}>
                                350 Total Price
                            </Typography>
                            <Button color="primary" onClick={() => setEditPrice(true)} endIcon={<EditIcon />}>
                                Edit Price
                            </Button>
                        </>
                    ) : (
                        <>
                            <TextField autoFocus margin="dense" id="name" label="Price" type="number" name="price" variant="outlined" onChange={handleOnChange} value={350} />
                            <Button color="primary" onClick={() => setEditPrice(false)}>
                                Edit Price
                            </Button>
                            <Button color="error" onClick={() => setEditPrice(false)}>
                                Cancel
                            </Button>
                        </>
                    )}
                </Stack>
            </Stack>
            <Divider />
            <Typography variant="h3">Client Information</Typography>
            <Grid direction={"row"}>
                <TextField margin="dense" id="full_name" label="Full Name" type="text" name="full_name" variant="outlined" onChange={handleOnChange} value={350} />
                <TextField style={{ marginLeft: "3%" }} margin="dense" id="phone" label="Phone" type="number" name="phone" variant="outlined" onChange={handleOnChange} value={350} />
            </Grid>
            <Grid direction={"row"}>
                <TextField margin="dense" id="email" label="Email" type="email" name="email" variant="outlined" onChange={handleOnChange} value={350} />
                <TextField style={{ marginLeft: "3%" }} margin="dense" id="guests" label="Number of Guests" type="number" name="guests" variant="outlined" onChange={handleOnChange} value={350} />
            </Grid>
            <Grid direction={"row"}>
                <FormControlLabel control={<Checkbox defaultChecked />} label="No prepayment" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Deposit" />
                <FormControlLabel control={<Checkbox defaultChecked />} label="Full Prepayment" />
            </Grid>
            <FormControl fullWidth sx={{ m: 1, width: 300 }}>
                <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>
                <OutlinedInput id="outlined-adornment-amount" type="number" endAdornment={<InputAdornment position="start">$</InputAdornment>} label="Amount" />
            </FormControl>
        </Container>
    );
};

export default Booking;
