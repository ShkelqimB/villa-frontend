import { useEffect, useState } from "react";
import api from "../../api";
import CustomTable from "../../components/BothTable";

const IncomesAndExpenses = () => {
    const [expenses, setExpenses] = useState([]);
    const [incomes, setIncomes] = useState([]);
    const getExpenses = async () => {
        const result = await api.getAllExpenses();
        setExpenses(result.data);
    };

    const getIncomes = async () => {
        const result = await api.getAllRollPayment();
        setIncomes(result.data);
    };

    useEffect(() => {
        getExpenses();
        getIncomes();
    }, []);
    return (
        <>
            <CustomTable incomes={incomes} expenses={expenses} />
        </>
    );
};

export default IncomesAndExpenses;
