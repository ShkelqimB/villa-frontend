import { Container, Divider, Grid, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../../api";
import { Villa } from "../../interfaces/villa.interface";

const Home = () => {
    const [villas, setVillas] = useState([]);
    const getVillas = async () => {
        const result = await api.getAllVillas();
        console.log("🚀 ~ file: index.tsx:8 ~ getVillas ~ result", result.data);
        setVillas(result.data);
    };

    useEffect(() => {
        getVillas();
    }, []);
    return (
        <Container maxWidth="lg">
            <Typography variant="h3">Next Booking</Typography>
            <Divider />
            <Grid container spacing={2}>
                {villas.length > 0 &&
                    villas.map((row: Villa, index) => {
                        return (
                            <Grid
                                style={{
                                    background: "#FFFFFF 0% 0% no-repeat padding-box",
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
                                    <Typography variant="h5" fontWeight={"bold"}>
                                        06.02.2023
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h6">Florent Avdyli</Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h5" fontWeight={"bold"}>
                                        1 Day
                                    </Typography>
                                </Grid>
                            </Grid>
                        );
                    })}
            </Grid>
            <Divider />
            <Typography variant="h3">Income and expenses actual month</Typography>
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
                                    <Typography variant="h5" color="white" fontWeight={"bold"}>
                                        Income
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="h3" color="white" fontWeight={"bold"}>
                                        8330 $
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle1" color="white">
                                        Total
                                    </Typography>
                                </Grid>
                            </Grid>
                        );
                    })}
            </Grid>
        </Container>
    );
};

export default Home;
