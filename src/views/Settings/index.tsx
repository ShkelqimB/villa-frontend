import React, { useState } from "react";
import { Typography, Divider, Button, TextField, Grid } from "@mui/material";
import api from "../../api";
import { User } from "../../interfaces/user.interface";

export const Settings = () => {
    const [view, setView] = useState(true);
    const [values, setValues] = useState<User>({
        id: +"",
        email: "",
        full_name: "",
        phone: "",
        age: +"",
        role: +"",
        password: "",
    });

    const handleChange = (event: { persist: () => void; target: { name: any; value: any } }) => {
        event.persist();
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };

    const getUser = async () => {
        const user = await api.getUserByToken();
        setValues({
            id: user.data.id,
            email: user.data.email,
            full_name: user.data.full_name,
            phone: user.data.phone,
            age: user.data.age,
            role: user.data.role,
            password: user.data.password,
        });
    };

    const updateUser = async () => {
        await api.updateUser(values);
        setView(true);
    };

    React.useEffect(() => {
        getUser();
    }, []);

    return (
        <div>
            <Typography variant="h4">Settings</Typography>
            <Divider />
            <Grid container spacing={2} direction="column" style={{ marginTop: "5%", margin: "auto", textAlign: "center", alignItems: "center" }}>
                <Grid xs={12} md={12}>
                    <TextField
                        style={{ margin: 10 }}
                        id="full_name"
                        label="Full Name"
                        type="text"
                        name="full_name"
                        variant="outlined"
                        onChange={handleChange}
                        value={values?.full_name}
                        disabled={view || false}
                    />
                    <TextField style={{ margin: 10 }} id="email" label="Email" type="email" name="email" variant="outlined" onChange={handleChange} value={values?.email} disabled={view || false} />
                </Grid>
                <Grid xs={12} md={12}>
                    <TextField style={{ margin: 10 }} id="age" label="Age" type="number" name="age" variant="outlined" onChange={handleChange} value={values?.age} disabled={view || false} />
                    <TextField style={{ margin: 10 }} id="phone" label="Phone" type="tel" name="phone" variant="outlined" onChange={handleChange} value={values?.phone} disabled={view || false} />
                </Grid>
                <Grid xs={12} md={12}>
                    {" "}
                    <TextField style={{ margin: 10 }} id="role" label="Role" type="text" name="role" variant="outlined" onChange={handleChange} value={values?.role} disabled={view || false} />
                    <TextField
                        style={{ margin: 10 }}
                        id="password"
                        label="Password"
                        type="password"
                        name="password"
                        variant="outlined"
                        onChange={handleChange}
                        value={values?.password}
                        disabled={view || false}
                    />
                </Grid>
                {view ? (
                    <Button variant="contained" color="primary" onClick={() => setView(false)}>
                        Update
                    </Button>
                ) : (
                    <>
                        <Button variant="contained" color="primary" onClick={() => updateUser()}>
                            Save Settings
                        </Button>
                        <Button variant="contained" color="error" onClick={() => setView(true)}>
                            Cancel
                        </Button>
                    </>
                )}
            </Grid>
        </div>
    );
};

export default Settings;
