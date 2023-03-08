/* eslint-disable jsx-a11y/alt-text */
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, TextField, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import api from "../../api";
import { Villa } from "../../interfaces/villa.interface";

const Villas = () => {
    const [villas, setVillas] = useState([]);
    const [updatedObj, setUpdatedObj] = useState({});
    const [deleteObj, setDeleteObj] = useState({});
    const [openPopUp, setOpenPopUp] = useState({ update: false, delete: false, create: false });
    const getVillas = async () => {
        const result = await api.getAllVillas();
        setVillas(result.data);
    };

    useEffect(() => {
        getVillas();
    }, []);
    return (
        <>
            <Button variant="contained" style={{ width: 200, margin: 5 }} onClick={() => setOpenPopUp({ ...openPopUp, create: true })}>
                Add Villa
            </Button>
            <CreateDialog open={openPopUp} setOpen={setOpenPopUp} villas={villas} setVillas={setVillas} />
            <UpdateDialog open={openPopUp} setOpen={setOpenPopUp} villas={villas} setVillas={setVillas} updatedObj={updatedObj} setUpdatedObj={setUpdatedObj} />
            <DeleteDialog open={openPopUp} setOpen={setOpenPopUp} deleteObj={deleteObj} villas={villas} setVillas={setVillas} />
            <Grid container direction={"column"} style={{ paddingLeft: "10%", paddingRight: "10%" }}>
                {villas.length > 0 &&
                    villas.map((row: Villa, index) => {
                        return (
                            <Grid
                                container
                                spacing={2}
                                style={{
                                    background: "#FFFFFF 0% 0% no-repeat padding-box",
                                    boxShadow: "0px 3px 6px #00000029",
                                    borderRadius: 16,
                                    opacity: 1,
                                    marginTop: "2%",
                                    // margin: "5% auto auto",
                                    padding: "1%",
                                    width: "100%",
                                }}
                                key={index}
                            >
                                <Grid item xs={6} sm={6} md={2}>
                                    <img src="https://source.unsplash.com/random" style={{ width: "100%", height: 100, border: "1px solid #707070", opacity: 1, borderRadius: "100%" }} />
                                </Grid>
                                <Grid item xs={6} sm={6} md={8}>
                                    <Typography variant="h4" fontWeight="800" noWrap>
                                        Name: {row.name}
                                    </Typography>
                                    <Typography variant="h6">Guests: {row.guests}</Typography>
                                    <Typography variant="h6">Price: {row.price}</Typography>
                                </Grid>
                                <Grid item xs={12} sm={12} md={2}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ width: "100%", marginTop: 5, marginBottom: 5 }}
                                        onClick={() => {
                                            setOpenPopUp({ ...openPopUp, update: true });
                                            setUpdatedObj(row);
                                        }}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        style={{ width: "100%", marginTop: 5, marginBottom: 5 }}
                                        onClick={() => {
                                            setOpenPopUp({ ...openPopUp, delete: true });
                                            setDeleteObj(row);
                                        }}
                                    >
                                        Remove
                                    </Button>
                                </Grid>
                            </Grid>
                        );
                    })}
            </Grid>
        </>
    );
};

export default Villas;

const CreateDialog = ({ open, setOpen, villas, setVillas }: any) => {
    const [values, setValues] = useState({
        name: "",
        price: +"",
        guests: +"",
    });

    const handleChange = (event: { persist: () => void; target: { name: any; value: any } }) => {
        event.persist();
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };

    const createVilla = async () => {
        const { data } = await api.createVilla(values);
        if (data) {
            setVillas((prev: Villa[]) => [...prev, data]);
            setOpen({ ...open, create: false });
        } else {
            console.log("ERROR deleting expense; ", data);
        }
    };
    return (
        <Dialog open={open.create} onClose={() => setOpen({ ...open, create: false })}>
            <DialogTitle>Create Villa</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" id="name" label="Name" type="name" name="name" fullWidth variant="standard" onChange={handleChange} value={values.name} />
                <TextField margin="dense" id="price" label="price" type="price" name="price" fullWidth variant="standard" onChange={handleChange} value={values.price} />
                <TextField margin="dense" id="guests" label="guests" type="guests" name="guests" fullWidth variant="standard" onChange={handleChange} value={values.guests} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen({ ...open, create: false })}>Cancel</Button>
                <Button onClick={() => createVilla()}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

const UpdateDialog = ({ open, setOpen, setVillas, updatedObj, setUpdatedObj }: any) => {
    const [values, setValues] = useState({
        id: +"",
        name: "",
        price: +"",
        guests: +"",
    });

    const handleChange = (event: { persist: () => void; target: { name: any; value: any } }) => {
        event.persist();

        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };

    const updateExp = async () => {
        const updatedVilla = await api.updateVilla(values);
        if (updatedVilla) {
            setVillas((prev: Villa[]) => prev.map((item: Villa) => (item.id !== values.id ? item : values)));
            setOpen({ ...open, update: false });
        } else {
            console.log("ERROR updating villa; ", updatedVilla);
        }
    };

    useEffect(() => {
        setValues({
            id: updatedObj.id,
            name: updatedObj.name,
            price: updatedObj.price,
            guests: updatedObj.guests,
        });
    }, [updatedObj.price, updatedObj.id, updatedObj.name, updatedObj.guests]);

    return (
        <Dialog open={open.update} onClose={() => setOpen({ ...open, update: false })}>
            <DialogTitle>Update Expense</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" label="Name" type="text" fullWidth name="name" onChange={handleChange} value={values?.name} />
                <TextField margin="dense" label="Guest" type="text" fullWidth name="guests" onChange={handleChange} value={values?.guests} />
                <TextField margin="dense" label="Price" type="number" fullWidth name="price" onChange={handleChange} value={values?.price} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen({ ...open, update: false })}>Cancel</Button>
                <Button onClick={() => updateExp()}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

const DeleteDialog = ({ open, setOpen, deleteObj, villas, setVillas }: any) => {
    const removeExp = async () => {
        const removedItem = await api.removeVilla(deleteObj.id);
        if (removedItem) {
            const del = villas.filter((exp: Villa) => deleteObj.id !== exp.id);
            setVillas(del);
            setOpen({ ...open, delete: false });
        } else {
            console.log("ERROR deleting expense; ", removedItem);
        }
    };
    return (
        <Dialog open={open.delete} className="" maxWidth={"sm"}>
            <DialogTitle id="dialogTitleForDeleting" className="dialogTitleForDeleting" hidden={open.delete === false}>
                Do you want to delete ?
            </DialogTitle>
            <DialogActions>
                {/* {spinner.delete ? <CircularProgress className="spinner-delete" /> : ""}
                {spinner.delete ? <p className="sso-provider-deleting">Deleting....</p> : ""} */}
                <Button variant="contained" onClick={() => removeExp()}>
                    Yes
                </Button>
                <Button variant="contained" onClick={() => setOpen({ ...open, delete: false })}>
                    Cancel
                </Button>
            </DialogActions>
        </Dialog>
    );
};
