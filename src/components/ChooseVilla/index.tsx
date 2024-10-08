import { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import api from "../../api";
import { Villa } from "../../interfaces/villa.interface";

const ChooseVilla = ({ fullValues, setFullValues }: any) => {
    const [villas, setVillas] = useState([]);
    const [selected, setSelected] = useState<number>();

    const getVillas = async () => {
        const result = await api.getAllVillas();
        setVillas(result.data);
    };

    const handleClickVilla = (value: Villa) => {
        setFullValues({ ...fullValues, villa: value });
        setSelected(value.id);
    };

    useEffect(() => {
        getVillas();
    }, []);
    return (
        <Grid container spacing={2} style={{ marginTop: 10 }}>
            {villas.length > 0 &&
                villas.map((row: Villa, index) => {
                    return (
                        <Grid
                            style={{
                                background: selected === row.id ? "#0092D7 0% 0% no-repeat padding-box" : "white",
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
                                <Typography variant="h4" fontWeight={"bold"} color={selected === row.id ? "white" : "black"}>
                                    {row.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h5" color={selected === row.id ? "white" : "black"}>
                                    {row.price} per day
                                </Typography>
                            </Grid>
                        </Grid>
                    );
                })}
        </Grid>
    );
};

export default ChooseVilla;
