import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Box, Toolbar, Typography, Divider, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import api from "../../api";
import { Expense } from "../../interfaces/expense.interface";
import { Roll_Payment } from "../../interfaces/rollPayment.interface";

function TableToolbar({ children }: any) {
    return (
        <Toolbar sx={{ pl: { sm: 2 }, pr: { xs: 1, sm: 1 } }}>
            <Typography sx={{ flex: "1 1 100%" }} variant="h4" id="tableTitle" component="div">
                {children}
            </Typography>
        </Toolbar>
    );
}

const CustomTable = (props: any) => {
    const { incomes, expenses } = props;
    const [totalIncome, setTotalIncome] = useState();
    const [totalExpense, setTotalExpense] = useState();
    const getTotalIncome = async () => {
        const result = await api.getIncome();
        setTotalIncome(result.data.total);
    };

    const getExpenseTotal = async () => {
        const result = await api.getTotal();
        setTotalExpense(result.data.total);
    };
    useEffect(() => {
        getTotalIncome();
        getExpenseTotal();
    }, []);
    return (
        <Box>
            <Typography sx={{ flex: "1 1 100%" }} variant="h2" id="tableTitle" component="div">
                Income and expenses overview
            </Typography>
            <Divider />
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <TableToolbar>Income</TableToolbar>
                    <TableContainer style={{ height: 400 }}>
                        <Table sx={{ maxWidth: "80%", marginRight: "auto", marginLeft: "auto" }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <b>Name</b>
                                    </TableCell>
                                    <TableCell align="right">
                                        <b>Total</b>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {incomes?.length > 0 &&
                                    incomes?.map((row: Roll_Payment) => (
                                        <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                            <TableCell component="th" scope="row">
                                                {row.villa?.name}
                                            </TableCell>
                                            <TableCell align="right">{row.villa?.price}$</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography sx={{ flex: "1 1 100%", margin: 5 }} variant="h4" id="tableTitle" component="div">
                        Total: {totalIncome} $
                    </Typography>
                </Grid>
                <Grid item xs={12} md={6}>
                    <TableToolbar>Expense</TableToolbar>
                    <TableContainer style={{ height: 400 }}>
                        <Table sx={{ maxWidth: "80%", marginRight: "auto", marginLeft: "auto" }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>
                                        <b>Name</b>
                                    </TableCell>
                                    <TableCell align="right">
                                        <b>Total</b>
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {expenses?.length > 0 &&
                                    expenses?.map((row: Expense) => (
                                        <TableRow key={row.id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
                                            <TableCell component="th" scope="row">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.total}$</TableCell>
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    <Typography sx={{ flex: "1 1 100%", margin: 5 }} variant="h4" id="tableTitle" component="div">
                        Total: {totalExpense} $
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default CustomTable;
