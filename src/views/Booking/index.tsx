// REACT
import { useState } from "react";
// Material UI
import { Button, Container, Divider, Typography } from "@mui/material";
// Components
import { Client_RollPayment } from "../../interfaces/rollPayment.interface";
import "./booking.css";
import ChooseVilla from "../../components/ChooseVilla";
import PickDateTime from "../../components/PickDateTime";
import ChooseClient from "../../components/ChooseClient";
import api from "../../api";

const Booking = () => {
    const [fullValues, setFullValues] = useState<Client_RollPayment>({
        id: +"",
        amount: +"",
        guests: +"",
        checkin: "",
        checkout: "",
        no_prepayment: false,
        deposit: false,
        full_prepayment: false,
        client: { full_name: "", email: "", phone: "", guests: +"" },
        villa: { id: +"", name: "", price: +"", guests: +"" },
    });
    const createBooking = async () => {
        const response = await api.createRollPayment(fullValues);
        if (response.status === 200) {
            setFullValues({
                id: +"",
                amount: +"",
                guests: +"",
                checkin: "",
                checkout: "",
                no_prepayment: false,
                deposit: false,
                full_prepayment: false,
                client: { full_name: "", email: "", phone: "", guests: +"" },
                villa: { id: +"", name: "", price: +"", guests: +"" },
            });
        } else {
            console.log("ERROR deleting expense; ", response.data);
        }
    };
    return (
        <Container maxWidth="lg">
            <Typography variant="h3">Select Villa</Typography>
            <Divider />
            <ChooseVilla fullValues={fullValues} setFullValues={setFullValues} />
            <Divider />
            <Typography variant="h3">Select Date</Typography>
            <PickDateTime fullValues={fullValues} setFullValues={setFullValues} />
            <Divider />
            <Typography variant="h3">Client Information</Typography>
            <ChooseClient fullValues={fullValues} setFullValues={setFullValues} />
            <Divider />
            <Button variant="contained" color="primary" onClick={() => createBooking()}>
                Add Booking
            </Button>
        </Container>
    );
};

export default Booking;
