import { Container, Divider, Grid, Typography } from "@mui/material";
import moment from "moment";
import { useState, useEffect } from "react";
import api from "../../api";
import { Roll_Payment } from "../../interfaces/rollPayment.interface";

const Home = () => {
    const [rollPayments, setRollPayments] = useState<Roll_Payment[]>([]);
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const [totalExpense, setTotalExpense] = useState<number>(0);
    const getRollPayments = async () => {
        const result = await api.getAllRollPayment();
        setRollPayments(result.data);
    };

    const getTotalIncome = async () => {
        const result = await api.getIncome();
        setTotalIncome(result.data.total);
    };

    const getTotalExpense = async () => {
        const result = await api.getTotal();
        setTotalExpense(result.data.total);
    };

    useEffect(() => {
        getRollPayments();
        getTotalIncome();
        getTotalExpense();
    }, []);
    return (
        <Container maxWidth="lg">
            <Typography variant="h3">Next Booking</Typography>
            <Divider />
            <Grid container>
                {rollPayments.length > 0 &&
                    rollPayments.map((row: Roll_Payment, index: number) => {
                        var a = moment(row.checkin);
                        var b = moment(row.checkout);
                        return (
                            <Grid
                                style={{
                                    background: "#FFFFFF 0% 0% no-repeat padding-box",
                                    boxShadow: "0px 3px 6px #00000029",
                                    borderRadius: 19,
                                    opacity: 1,
                                    margin: "2%",
                                    textAlign: "center",
                                    width: 240,
                                    padding: 20,
                                }}
                                key={index}
                            >
                                <Grid item xs={12}>
                                    <Typography variant="h5" fontWeight={"bold"}>
                                        {moment(row.checkin).format("DD.MM.YYYY")}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6">{row.client.full_name}</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5" fontWeight={"bold"}>
                                        {Math.abs(a.diff(b, "days"))} days
                                    </Typography>
                                </Grid>
                            </Grid>
                        );
                    })}
            </Grid>
            <Divider />
            <Typography variant="h3">Income and expenses actual month</Typography>
            <Grid container spacing={2}>
                <Grid
                    style={{
                        background: "#0092D7 0% 0% no-repeat padding-box",
                        boxShadow: "0px 3px 6px #00000029",
                        borderRadius: 19,
                        opacity: 1,
                        margin: "2%",
                        textAlign: "center",
                        width: 240,
                        padding: 20,
                    }}
                >
                    <Grid item xs={12}>
                        <Typography variant="h5" color="white" fontWeight={"bold"}>
                            Income
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4" color="white" fontWeight={"bold"}>
                            {totalIncome} $
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color="white">
                            Total
                        </Typography>
                    </Grid>
                </Grid>
                <Grid
                    style={{
                        background: "#0092D7 0% 0% no-repeat padding-box",
                        boxShadow: "0px 3px 6px #00000029",
                        borderRadius: 19,
                        opacity: 1,
                        margin: "2%",
                        textAlign: "center",
                        width: 240,
                        padding: 20,
                    }}
                >
                    <Grid item xs={12}>
                        <Typography variant="h5" color="white" fontWeight={"bold"}>
                            Expense
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="h4" color="white" fontWeight={"bold"}>
                            {totalExpense} $
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle1" color="white">
                            Total
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Home;
