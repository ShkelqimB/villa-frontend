import { Checkbox, FormControl, FormControlLabel, Grid, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import { useState } from "react";

const ChooseClient = ({ fullValues, setFullValues }: any) => {
    const [error, setError] = useState(false);
    const handleChangeCheckBox = (event: { persist: () => void; target: { name: any; checked: boolean } }) => {
        event.persist();
        setFullValues((values: any) => ({
            ...values,
            [event.target.name]: event.target.checked,
        }));
    };

    const handleChangeText = (event: { persist: () => void; target: { name: any; value: any } }) => {
        event.persist();
        setFullValues((values: any) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };

    const handleChangeClient = (event: { persist: () => void; target: { name: any; value: any } }) => {
        event.persist();
        if (event.target.name === "guests" && event.target.value > fullValues.villa.guests) {
            setError(true);
        } else {
            setError(false);
        }
        setFullValues((values: any) => ({
            ...values,
            client: {
                ...values.client,
                [event.target.name]: event.target.value,
            },
        }));
    };
    return (
        <>
            <Grid>
                <TextField margin="dense" id="full_name" label="Full Name" type="text" name="full_name" variant="outlined" onChange={handleChangeClient} value={fullValues.client?.full_name} />
                <TextField
                    style={{ marginLeft: "3%" }}
                    margin="dense"
                    id="phone"
                    label="Phone"
                    type="text"
                    name="phone"
                    variant="outlined"
                    onChange={handleChangeClient}
                    value={fullValues.client?.phone}
                />
            </Grid>
            <Grid>
                <TextField margin="dense" id="email" label="Email" type="email" name="email" variant="outlined" onChange={handleChangeClient} value={fullValues.client?.email} />
                <TextField
                    style={{ marginLeft: "3%", width: 235 }}
                    margin="dense"
                    id="guests"
                    label="Number of Guests"
                    type="number"
                    name="guests"
                    variant="outlined"
                    onChange={handleChangeClient}
                    value={fullValues.client?.guests}
                    InputProps={{ inputProps: { min: 0, max: fullValues.villa.guests } }}
                    error={error}
                    helperText={error ? "Incorrect entry." : null}
                />
            </Grid>
            <Grid>
                <FormControlLabel control={<Checkbox name="no_prepayment" onChange={handleChangeCheckBox} color="primary" checked={fullValues.no_prepayment} />} label="No prepayment" />
                <FormControlLabel control={<Checkbox name="deposit" onChange={handleChangeCheckBox} color="primary" checked={fullValues.deposit} />} label="Deposit" />
                <FormControlLabel control={<Checkbox name="full_prepayment" onChange={handleChangeCheckBox} color="primary" checked={fullValues.full_prepayment} />} label="Full Prepayment" />
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
        </>
    );
};

export default ChooseClient;
