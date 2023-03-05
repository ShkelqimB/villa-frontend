import React, { useEffect, useState } from "react";
import api from "../../api";
import CustomTable from "../../components/TableExpense";
// import { Expense } from "../../interfaces/expense.interface";

const Expenses = () => {
    const [expenses, setExpenses] = useState([]);
    const getExpenses = async () => {
        const result = await api.getAllExpenses();
        setExpenses(result.data);
    };

    useEffect(() => {
        getExpenses();
    }, []);
    return (
        <>
            <CustomTable expenses={expenses} setExpenses={setExpenses} />
        </>
    );
};

export default Expenses;
