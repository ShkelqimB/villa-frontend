import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    Box,
    IconButton,
    Toolbar,
    Tooltip,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogActions,
    Fab,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import api from "../../api";
import { Expense } from "../../interfaces/expense.interface";
import { useEffect, useState } from "react";
import { Client } from "../../interfaces/client.interface";

function TableToolbar({ openPopUp, setOpenPopUp, client, setClient }: any) {
    return (
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
            <Typography sx={{ flex: "1 1 100%" }} variant="h4" id="tableTitle" component="div">
                Client
            </Typography>
            <Fab color="primary" aria-label="add" variant="extended" onClick={() => setOpenPopUp({ ...openPopUp, create: true })}>
                <AddIcon sx={{ mr: 1 }} />
                Create
            </Fab>
        </Toolbar>
    );
}

const CustomTable = (props: any) => {
    const { client, setClient } = props;
    const [updatedObj, setUpdatedObj] = useState({});
    const [deleteObj, setDeleteObj] = useState({});
    const [openPopUp, setOpenPopUp] = useState({ update: false, delete: false, create: false });

    return (
        <Box sx={{ width: "100%" }}>
            {/* <Paper sx={{ width: "100%", mb: 2 }}> */}
            <CreateDialog open={openPopUp} setOpen={setOpenPopUp} client={client} setClient={setClient} />
            <UpdateDialog open={openPopUp} setOpen={setOpenPopUp} client={client} setClient={setClient} updatedObj={updatedObj} setUpdatedObj={setUpdatedObj} />
            <DeleteDialog open={openPopUp} setOpen={setOpenPopUp} deleteObj={deleteObj} client={client} setClient={setClient} />
            <TableToolbar openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} client={client} setClient={setClient} />
            <TableContainer>
                <Table sx={{ minWidth: 650, marginRight: "auto", marginLeft: "auto", width: "90%" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Email</TableCell>
                            <TableCell>Full Name</TableCell>
                            <TableCell align="right">Phone</TableCell>
                            <TableCell align="right">Guests</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {client?.length > 0 &&
                            client?.map((row: Client) => (
                                <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.email}
                                    </TableCell>
                                    <TableCell>{row.full_name}</TableCell>
                                    <TableCell align="right">{row.phone}</TableCell>
                                    <TableCell align="right">{row.guests}</TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="Delete">
                                            <IconButton
                                                onClick={() => {
                                                    setOpenPopUp({ ...openPopUp, delete: true });
                                                    setDeleteObj(row);
                                                }}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Edit">
                                            <IconButton
                                                onClick={() => {
                                                    setOpenPopUp({ ...openPopUp, update: true });
                                                    setUpdatedObj(row);
                                                }}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {/* </Paper> */}
        </Box>
    );
};

export default CustomTable;

const CreateDialog = ({ open, setOpen, client, setClient }: any) => {
    const [values, setValues] = useState({
        full_name: "",
        email: "",
        phone: "",
        guests: +"",
    });

    const handleChange = (event: { persist: () => void; target: { name: any; value: any } }) => {
        event.persist();
        setValues((values) => ({
            ...values,
            [event.target.name]: event.target.value,
        }));
    };

    const createExpense = async () => {
        const { data } = await api.createExpense(values);
        if (data) {
            setClient((prev: Expense[]) => [...prev, data]);
            setOpen({ ...open, create: false });
        } else {
            console.log("ERROR deleting expense; ", data);
        }
    };
    return (
        <Dialog open={open.create} onClose={() => setOpen({ ...open, create: false })}>
            <DialogTitle>Create Expense</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" id="email" label="email" type="email" name="email" fullWidth variant="standard" onChange={handleChange} value={values.email} />
                <TextField margin="dense" id="description" label="Description" type="description" name="description" fullWidth variant="standard" onChange={handleChange} value={values.full_name} />
                <TextField margin="dense" id="phone" label="Phone" type="tel" name="phone" fullWidth variant="standard" onChange={handleChange} value={values.phone} />
                <TextField margin="dense" id="guests" label="Guests" type="number" name="guests" fullWidth variant="standard" onChange={handleChange} value={values.guests} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen({ ...open, create: false })}>Cancel</Button>
                <Button onClick={() => createExpense()}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

const UpdateDialog = ({ open, setOpen, setClient, updatedObj, setUpdatedObj }: any) => {
    const [values, setValues] = useState({
        id: +"",
        full_name: "",
        email: "",
        phone: "",
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
        const updatedExpense = await api.updateClient(values);
        if (updatedExpense) {
            setClient((prev: Expense[]) => prev.map((item: Expense) => (item.id !== values.id ? item : values)));
            setOpen({ ...open, update: false });
        } else {
            console.log("ERROR updating expense; ", updatedExpense);
        }
    };

    useEffect(() => {
        setValues({
            id: updatedObj.id,
            full_name: updatedObj.full_name,
            email: updatedObj.email,
            phone: updatedObj.phone,
            guests: updatedObj.guests,
        });
    }, [updatedObj.email, updatedObj.full_name, updatedObj.guests, updatedObj.id, updatedObj.phone]);

    return (
        <Dialog open={open.update} onClose={() => setOpen({ ...open, update: false })}>
            <DialogTitle>Update Expense</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" id="email" label="email" type="email" name="email" fullWidth variant="standard" onChange={handleChange} value={values.email} />
                <TextField margin="dense" id="description" label="Description" type="description" name="description" fullWidth variant="standard" onChange={handleChange} value={values.full_name} />
                <TextField margin="dense" id="phone" label="Phone" type="tel" name="phone" fullWidth variant="standard" onChange={handleChange} value={values.phone} />
                <TextField margin="dense" id="guests" label="Guests" type="number" name="guests" fullWidth variant="standard" onChange={handleChange} value={values.guests} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen({ ...open, update: false })}>Cancel</Button>
                <Button onClick={() => updateExp()}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

const DeleteDialog = ({ open, setOpen, deleteObj, client, setClient }: any) => {
    const removeExp = async () => {
        const removedItem = await api.removeClient(deleteObj.id);
        if (removedItem) {
            const del = client.filter((exp: Client) => deleteObj.id !== exp.id);
            setClient(del);
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
