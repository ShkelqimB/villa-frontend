import { useEffect, useState } from "react";
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
    DialogActions,
    Fab,
    Divider,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import api from "../../api";
import { Client_RollPayment, Roll_Payment } from "../../interfaces/rollPayment.interface";
import moment from "moment";
import ChooseVilla from "../ChooseVilla";
import PickDateTime from "../PickDateTime";
import ChooseClient from "../ChooseClient";

function TableToolbar({ openPopUp, setOpenPopUp }: any) {
    return (
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
            <Typography sx={{ flex: "1 1 100%" }} variant="h4" id="tableTitle" component="div">
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
            {/* <Paper sx={{ width: "100%", mb: 2 }}> */}
            <CreateDialog open={openPopUp} setOpen={setOpenPopUp} incomes={incomes} setIncomes={setIncomes} />
            <UpdateDialog open={openPopUp} setOpen={setOpenPopUp} incomes={incomes} setIncomes={setIncomes} updatedObj={updatedObj} setUpdatedObj={setUpdatedObj} />
            <DeleteDialog open={openPopUp} setOpen={setOpenPopUp} deleteObj={deleteObj} incomes={incomes} setIncomes={setIncomes} />
            <TableToolbar openPopUp={openPopUp} setOpenPopUp={setOpenPopUp} incomes={incomes} setIncomes={setIncomes} />
            <TableContainer>
                <Table sx={{ minWidth: 650, marginRight: "auto", marginLeft: "auto", width: "90%" }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Amount</TableCell>
                            <TableCell>Guest</TableCell>
                            <TableCell>Guests</TableCell>
                            <TableCell>Checkin</TableCell>
                            <TableCell>Checkout</TableCell>
                            <TableCell>Villa Name</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {incomes?.length > 0 &&
                            incomes?.map((row: Roll_Payment) => (
                                <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                    <TableCell component="th" scope="row">
                                        {row.amount}
                                    </TableCell>
                                    <TableCell>{row.client?.full_name}</TableCell>
                                    <TableCell>{row?.villa?.guests}</TableCell>
                                    <TableCell>{moment(row?.checkin).format("MMMM Do YYYY, h:mm:ss a")}</TableCell>
                                    <TableCell>{moment(row?.checkout).format("MMMM Do YYYY, h:mm:ss a")}</TableCell>
                                    <TableCell>{row.villa?.name}</TableCell>
                                    <TableCell>
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

const CreateDialog = ({ open, setOpen, incomes, setIncomes }: any) => {
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
            setIncomes((prev: Roll_Payment[]) => [...prev, response.data]);
            setOpen({ ...open, create: false });
        } else {
            console.log("ERROR deleting expense; ", response.data);
        }
    };
    return (
        <Dialog open={open.create} onClose={() => setOpen({ ...open, create: false })} fullWidth maxWidth="lg">
            <DialogTitle>Create Expense</DialogTitle>
            <DialogContent>
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
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen({ ...open, create: false })}>Cancel</Button>
                <Button onClick={() => createBooking()}>Create</Button>
            </DialogActions>
        </Dialog>
    );
};

const UpdateDialog = ({ open, setOpen, setIncomes, updatedObj, setUpdatedObj }: any) => {
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

    const updateRollPayment = async () => {
        const updatedRoll_Payment = await api.updateRollPayment(fullValues);
        if (updatedRoll_Payment) {
            setIncomes((prev: Roll_Payment[]) => prev.map((item: Roll_Payment) => (item.id !== fullValues.id ? item : fullValues)));
            setOpen({ ...open, update: false });
        } else {
            console.log("ERROR updating roll payment; ", updatedRoll_Payment);
        }
    };

    useEffect(() => {
        setFullValues({
            id: updatedObj.id,
            amount: updatedObj.amount,
            guests: updatedObj.guests,
            checkin: updatedObj.checkin,
            checkout: updatedObj.checkout,
            no_prepayment: updatedObj.no_prepayment,
            deposit: updatedObj.deposit,
            full_prepayment: updatedObj.full_prepayment,
            client: { id: updatedObj?.client?.id, full_name: updatedObj?.client?.full_name, email: updatedObj?.client?.email, phone: updatedObj?.client?.phone, guests: updatedObj?.client?.guests },
            villa: { id: updatedObj?.villa?.id, name: updatedObj?.villa?.name, price: updatedObj?.villa?.price, guests: updatedObj?.villa?.guests },
        });
    }, [
        updatedObj.amount,
        updatedObj.checkin,
        updatedObj.checkout,
        updatedObj.client?.email,
        updatedObj.client?.full_name,
        updatedObj.client?.guests,
        updatedObj.client?.id,
        updatedObj.client?.phone,
        updatedObj.date,
        updatedObj.deposit,
        updatedObj.description,
        updatedObj.full_prepayment,
        updatedObj.guests,
        updatedObj.id,
        updatedObj.name,
        updatedObj.no_prepayment,
        updatedObj.total,
        updatedObj.villa?.guests,
        updatedObj.villa?.id,
        updatedObj.villa?.name,
        updatedObj.villa?.price,
    ]);

    return (
        <Dialog open={open.update} onClose={() => setOpen({ ...open, update: false })} maxWidth="lg">
            <DialogTitle>Update Income</DialogTitle>
            <DialogContent>
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
            </DialogContent>
            <DialogActions>
                <Button onClick={() => setOpen({ ...open, update: false })}>Cancel</Button>
                <Button onClick={() => updateRollPayment()}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

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
