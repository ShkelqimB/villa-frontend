import axios from "axios";
import { Expense } from "../interfaces/expense.interface";
import { User } from "../interfaces/user.interface";
import { Villa } from "../interfaces/villa.interface";

const baseAPI = `http://localhost:5000/api/`;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    //#region Auth
    login: (values: any) => axios.post(`${baseAPI}authentication/login`, values, { withCredentials: true }),
    logout: () => axios.post(`${baseAPI}authentication/logout`, null, { withCredentials: true }),
    //#endregion
    //#region Villa API
    getAllVillas: () => axios.get(`${baseAPI}villa`),
    getVillaById: (id: number) => axios.get(`${baseAPI}villa/${id}`),
    createVilla: (values: any) => axios.post(`${baseAPI}villa`, values),
    updateVilla: (values: Villa) => axios.put(`${baseAPI}villa/${values.id}`, values),
    removeVilla: (id: number) => axios.delete(`${baseAPI}villa/${id}`),
    //#endregion
    //#region User API
    getAllUsers: () => axios.get(`${baseAPI}user`),
    getUserById: (id: number) => axios.get(`${baseAPI}user/${id}`),
    createUser: (values: any) => axios.post(`${baseAPI}user`, values),
    updateUser: (values: User) => axios.put(`${baseAPI}user/${values.id}`, values),
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
