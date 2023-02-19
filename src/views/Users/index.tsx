import { useState, useEffect } from "react";
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Fab,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Toolbar,
    Tooltip,
    Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import api from "../../api";
import { User } from "../../interfaces/user.interface";

function TableToolbar({ openPopUp, setOpenPopUp }: any) {
    return (
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
            <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
                Users
            </Typography>
            <Fab color="primary" aria-label="add" variant="extended" onClick={() => setOpenPopUp({ ...openPopUp, create: true })}>
                <AddIcon sx={{ mr: 1 }} />
                Create
            </Fab>
        </Toolbar>
    );
}

const Users = () => {
    const [users, setUsers] = useState([]);
    const getUsers = async () => {
        const result = await api.getAllUsers();
        setUsers(result.data);
    };

    useEffect(() => {
        getUsers();
    }, []);
    const [updatedObj, setUpdatedObj] = useState({});
    const [deleteObj, setDeleteObj] = useState({});
    const [openPopUp, setOpenPopUp] = useState({ update: false, delete: false, create: false });
    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                <CreateDialog open={openPopUp} setOpen={setOpenPopUp} users={users} setUsers={setUsers} />
                <UpdateDialog open={openPopUp} setOpen={setOpenPopUp} users={users} setUsers={setUsers} updatedObj={updatedObj} setUpdatedObj={setUpdatedObj} />
                <DeleteDialog open={openPopUp} setOpen={setOpenPopUp} deleteObj={deleteObj} users={users} setUsers={setUsers} />
                <TableToolbar openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Full Name</TableCell>
                                <TableCell align="right">Email</TableCell>
                                <TableCell align="right">Phone</TableCell>
                                <TableCell align="right">Age</TableCell>
                                <TableCell align="right">Role</TableCell>
                                <TableCell align="right">Password</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users?.length > 0 &&
                                users?.map((row: User) => (
                                    <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {row.full_name}
                                        </TableCell>
                                        <TableCell align="right">{row.email}</TableCell>
                                        <TableCell align="right">{row.phone}</TableCell>
                                        <TableCell align="right">{row.age}</TableCell>
                                        <TableCell align="right">{row.role === 1 ? "Admin" : "Worker"}</TableCell>
                                        <TableCell align="right">*********</TableCell>
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
            </Paper>
        </Box>
    );
};

export default Users;

const CreateDialog = ({ open, setOpen, users, setUsers }: any) => {
    const [values, setValues] = useState({
        full_name: "",
        email: "",
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

    const createUser = async () => {
        const { data } = await api.createUser(values);
        if (data) {
            setUsers((prev: User[]) => [...prev, data]);
            setOpen({ ...open, create: false });
        } else {
            console.log("ERROR deleting User; ", data);
        }
    };
    return (
        <Dialog open={open.create} onClose={() => setOpen({ ...open, create: false })}>
            <DialogTitle>Create User</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" id="Full_name" label="Full Name" type="text" name="Full_name" fullWidth variant="standard" onChange={handleChange} value={values.full_name} />
                <TextField margin="dense" id="email" label="Email" type="email" name="email" fullWidth variant="standard" onChange={handleChange} value={values.email} />
                <TextField margin="dense" id="phone" label="Phone" type="number" name="phone" fullWidth variant="standard" onChange={handleChange} value={values.phone} />
                <TextField margin="dense" id="age" label="age" type="number" name="age" fullWidth variant="standard" onChange={handleChange} value={values.age} />
                <TextField margin="dense" id="role" label="role" type="text" name="role" fullWidth variant="standard" onChange={handleChange} value={values.role} />
                <TextField margin="dense" id="password" label="password" type="password" name="password" fullWidth variant="standard" onChange={handleChange} value={values.password} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen({ ...open, create: false })}>Cancel</Button>
                <Button onClick={() => createUser()}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

const UpdateDialog = ({ open, setOpen, setUsers, updatedObj, setUpdatedObj }: any) => {
    const [values, setValues] = useState({
        id: +"",
        full_name: "",
        email: "",
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

    const updateUser = async () => {
        const updatedUser = await api.updateUser(values);
        if (updatedUser) {
            setUsers((prev: User[]) => prev.map((item: User) => (item.id !== values.id ? item : values)));
            setOpen({ ...open, update: false });
        } else {
            console.log("ERROR updating User; ", updatedUser);
        }
    };

    useEffect(() => {
        setValues({
            id: updatedObj.id,
            full_name: updatedObj.full_name,
            email: updatedObj.email,
            phone: updatedObj.phone,
            age: updatedObj.age,
            role: updatedObj.role,
            password: updatedObj.password,
        });
    }, [updatedObj.age, updatedObj.email, updatedObj.full_name, updatedObj.id, updatedObj.password, updatedObj.phone, updatedObj.role]);

    return (
        <Dialog open={open.update} onClose={() => setOpen({ ...open, update: false })}>
            <DialogTitle>Update User</DialogTitle>
            <DialogContent>
                <TextField autoFocus margin="dense" id="Full_name" label="Full Name" type="text" name="Full_name" fullWidth variant="standard" onChange={handleChange} value={values.full_name} />
                <TextField margin="dense" id="email" label="Email" type="email" name="email" fullWidth variant="standard" onChange={handleChange} value={values.email} />
                <TextField margin="dense" id="phone" label="Phone" type="number" name="phone" fullWidth variant="standard" onChange={handleChange} value={values.phone} />
                <TextField margin="dense" id="age" label="age" type="number" name="age" fullWidth variant="standard" onChange={handleChange} value={values.age} />
                <TextField margin="dense" id="role" label="role" type="text" name="role" fullWidth variant="standard" onChange={handleChange} value={values.role} />
                <TextField margin="dense" id="password" label="password" type="password" name="password" fullWidth variant="standard" onChange={handleChange} value={values.password} />
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen({ ...open, update: false })}>Cancel</Button>
                <Button onClick={() => updateUser()}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

const DeleteDialog = ({ open, setOpen, deleteObj, users, setUsers }: any) => {
    const removeExp = async () => {
        const removedItem = await api.removeUser(deleteObj.id);
        if (removedItem) {
            const del = users.filter((exp: User) => deleteObj.id !== exp.id);
            setUsers(del);
            setOpen({ ...open, delete: false });
        } else {
            console.log("ERROR deleting user; ", removedItem);
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
