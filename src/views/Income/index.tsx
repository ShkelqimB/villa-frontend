import { useEffect, useState } from "react";
import api from "../../api";
import CustomTable from "../../components/TableIncome";

const Income = () => {
    const [incomes, setIncomes] = useState([]);
    const getIncomes = async () => {
        const result = await api.getAllRollPayment();
        setIncomes(result.data);
    };

    useEffect(() => {
        getIncomes();
    }, []);
    return (
        <>
            <CustomTable incomes={incomes} setIncomes={setIncomes} />
        </>
    );
};

export default Income;
