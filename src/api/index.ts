import axios from "axios";
import { Expense } from "../interfaces/expense.interface";

const baseAPI = `http://localhost:5000/api/`;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    //#region Villa API
    getAllVillas: () => axios.get(`${baseAPI}villa`),
    getVillaById: (id: number) => axios.get(`${baseAPI}villa/${id}`),
    createVilla: (values: any) => axios.post(`${baseAPI}villa`, values),
    updateVilla: (id: number, values: any) => axios.put(`${baseAPI}villa/${id}`, values),
    removeVilla: (id: number) => axios.delete(`${baseAPI}villa/${id}`),
    //#endregion
    //#region User API
    getAllUsers: () => axios.get(`${baseAPI}user`),
    getUserById: (id: number) => axios.get(`${baseAPI}user/${id}`),
    createUser: (values: any) => axios.post(`${baseAPI}user`, values),
    updateUser: (id: number, values: any) => axios.put(`${baseAPI}user/${id}`, values),
    removeUser: (id: number) => axios.delete(`${baseAPI}user/${id}`),
    //#endregion
    //#region Expense API
    getAllExpenses: () => axios.get(`${baseAPI}expense`),
    getExpenseById: (id: number) => axios.get(`${baseAPI}expense/${id}`),
    createExpense: (values: any) => axios.post(`${baseAPI}expense`, values),
    updateExpense: (values: Expense) => axios.put(`${baseAPI}expense/${values.id}`, values),
    removeExpense: (id: number) => axios.delete(`${baseAPI}expense/${id}`),
    //#endregion
};
