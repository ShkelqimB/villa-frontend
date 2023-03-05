import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
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
import { Roll_Payment } from "../../interfaces/rollPayment.interface";

function TableToolbar({ openPopUp, setOpenPopUp }: any) {
    return (
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
            <Typography sx={{ flex: "1 1 100%" }} variant="h6" id="tableTitle" component="div">
                Income
            </Typography>
            <Fab color="primary" aria-label="add" variant="extended" onClick={() => setOpenPopUp({ ...openPopUp, create: true })}>
                <AddIcon sx={{ mr: 1 }} />
                Create
            </Fab>
        </Toolbar>
    );
}

const CustomTable = (props: any) => {
    const { incomes, setIncomes } = props;
    const [updatedObj, setUpdatedObj] = useState({});
    const [deleteObj, setDeleteObj] = useState({});
    const [openPopUp, setOpenPopUp] = useState({ update: false, delete: false, create: false });

    return (
        <Box sx={{ width: "100%" }}>
            <Paper sx={{ width: "100%", mb: 2 }}>
                {/* <CreateDialog open={openPopUp} setOpen={setOpenPopUp} incomes={incomes} setIncomes={setIncomes} />
                <UpdateDialog open={openPopUp} setOpen={setOpenPopUp} incomes={incomes} setIncomes={setIncomes} updatedObj={updatedObj} setUpdatedObj={setUpdatedObj} /> */}
                <DeleteDialog open={openPopUp} setOpen={setOpenPopUp} deleteObj={deleteObj} incomes={incomes} setIncomes={setIncomes} />
                <TableToolbar openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} incomes={incomes} setIncomes={setIncomes} />
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Amount</TableCell>
                                <TableCell align="right">Guests</TableCell>
                                <TableCell align="right">Checkin</TableCell>
                                <TableCell align="right">Checkout</TableCell>
                                <TableCell align="right">Client Id</TableCell>
                                <TableCell align="right">Villa Id</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {incomes?.length > 0 &&
                                incomes?.map((row: Roll_Payment) => (
                                    <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                        <TableCell component="th" scope="row">
                                            {row.amount}
                                        </TableCell>
                                        <TableCell align="right">{row.guests}</TableCell>
                                        <TableCell align="right">{row.checkin}</TableCell>
                                        <TableCell align="right">{row.checkout}</TableCell>
                                        <TableCell align="right">{row.client.id}</TableCell>
                                        <TableCell align="right">{row.villa.id}</TableCell>
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

export default CustomTable;

// const CreateDialog = ({ open, setOpen, incomes, setIncomes }: any) => {
//     const [values, setValues] = useState({
//         amount: +"",
//         guests: +"",
//         checkin: "",
//         checkout: "",
//         villa: {},
//         client: {},
//     });

//     const handleChange = (event: { persist: () => void; target: { name: any; value: any } }) => {
//         event.persist();
//         setValues((values) => ({
//             ...values,
//             [event.target.name]: event.target.value,
//         }));
//     };

//     const createRollPayment = async () => {
//         const { data } = await api.createRollPayment(values);
//         if (data) {
//             setIncomes((prev: Roll_Payment[]) => [...prev, data]);
//             setOpen({ ...open, create: false });
//         } else {
//             console.log("ERROR deleting expense; ", data);
//         }
//     };
//     return (
//         <Dialog open={open.create} onClose={() => setOpen({ ...open, create: false })}>
//             <DialogTitle>Create Expense</DialogTitle>
//             <DialogContent>
//                 <TextField autoFocus margin="dense" id="name" label="Name" type="name" name="name" fullWidth variant="standard" onChange={handleChange} value={values.name} />
//                 <TextField margin="dense" id="description" label="Description" type="description" name="description" fullWidth variant="standard" onChange={handleChange} value={values.description} />
//                 <TextField margin="dense" id="date" label="Date" type="date" name="date" fullWidth variant="standard" onChange={handleChange} value={values.date} />
//                 <TextField margin="dense" id="total" label="Total" type="total" name="total" fullWidth variant="standard" onChange={handleChange} value={values.total} />
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={() => setOpen({ ...open, create: false })}>Cancel</Button>
//                 <Button onClick={() => createRollPayment()}>Create</Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

// const UpdateDialog = ({ open, setOpen, setIncomes, updatedObj, setUpdatedObj }: any) => {
//     console.log("🚀 ~ file: index.tsx:159 ~ UpdateDialog ~ updatedObj:", updatedObj);
//     const [values, setValues] = useState({
//         id: +"",
//         amount: "",
//         description: "",
//         date: new Date(),
//         total: +"",
//     });

//     const handleChange = (event: { persist: () => void; target: { name: any; value: any } }) => {
//         event.persist();

//         setValues((values) => ({
//             ...values,
//             [event.target.name]: event.target.value,
//         }));
//     };

//     const updateExp = async () => {
//         const updatedRoll_Payment = await api.updateExpense(values);
//         if (updatedRoll_Payment) {
//             setIncomes((prev: Roll_Payment[]) => prev.map((item: Roll_Payment) => (item.id !== values.id ? item : values)));
//             setOpen({ ...open, update: false });
//         } else {
//             console.log("ERROR updating roll payment; ", updatedRoll_Payment);
//         }
//     };

//     useEffect(() => {
//         setValues({
//             id: updatedObj.id,
//             name: updatedObj.name,
//             description: updatedObj.description,
//             date: updatedObj.date,
//             total: updatedObj.total,
//         });
//     }, [updatedObj.date, updatedObj.description, updatedObj.id, updatedObj.name, updatedObj.total]);

//     return (
//         <Dialog open={open.update} onClose={() => setOpen({ ...open, update: false })}>
//             <DialogTitle>Update Income</DialogTitle>
//             <DialogContent>
//                 <TextField autoFocus margin="dense" label="Name" type="text" fullWidth name="name" onChange={handleChange} value={values?.name} />
//                 <TextField margin="dense" label="Description" type="text" fullWidth name="description" onChange={handleChange} value={values?.description} />
//                 <TextField margin="dense" label="Date" type="date" fullWidth name="date" onChange={handleChange} value={values?.date} />
//                 <TextField margin="dense" label="Total" type="number" fullWidth name="total" onChange={handleChange} value={values?.total} />
//             </DialogContent>
//             <DialogActions>
//                 <Button onClick={() => setOpen({ ...open, update: false })}>Cancel</Button>
//                 <Button onClick={() => updateExp()}>Save</Button>
//             </DialogActions>
//         </Dialog>
//     );
// };

const DeleteDialog = ({ open, setOpen, deleteObj, incomes, setIncomes }: any) => {
    const removeExp = async () => {
        const removedItem = await api.removeRollPayment(deleteObj.id);
        if (removedItem) {
            const del = incomes.filter((exp: Roll_Payment) => deleteObj.id !== exp.id);
            setIncomes(del);
            setOpen({ ...open, delete: false });
        } else {
            console.log("ERROR deleting roll payment; ", removedItem);
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
