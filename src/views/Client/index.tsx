import React, { useEffect, useState } from "react";
import api from "../../api";
import CustomTable from "../../components/TableClient";

const Client = () => {
    const [client, setClient] = useState([]);
    const getClients = async () => {
        const result = await api.getAllClients();
        setClient(result.data);
    };

    useEffect(() => {
        getClients();
    }, []);
    return (
        <>
            <CustomTable client={client} setClient={setClient} />
        </>
    );
};

export default Client;
