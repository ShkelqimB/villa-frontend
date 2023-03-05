import axios from "axios";
import { Expense } from "../interfaces/expense.interface";
import { Client_RollPayment } from "../interfaces/rollPayment.interface";
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
    getUserByToken: () => axios.get(`${baseAPI}user/me`, { withCredentials: true }),
    getUserById: (id: number) => axios.get(`${baseAPI}user/${id}`),
    createUser: (values: any) => axios.post(`${baseAPI}user`, values),
    updateUser: (values: User) => axios.put(`${baseAPI}user/${values.id}`, values),
    removeUser: (id: number) => axios.delete(`${baseAPI}user/${id}`),
    //#endregion
    //#region Expense API
    getAllExpenses: () => axios.get(`${baseAPI}expense`),
    getTotal: () => axios.get(`${baseAPI}expense/total`),
    getExpenseById: (id: number) => axios.get(`${baseAPI}expense/${id}`),
    createExpense: (values: any) => axios.post(`${baseAPI}expense`, values),
    updateExpense: (values: Expense) => axios.put(`${baseAPI}expense/${values.id}`, values),
    removeExpense: (id: number) => axios.delete(`${baseAPI}expense/${id}`),
    //#endregion
    //#region Expense API
    getAllRollPayment: () => axios.get(`${baseAPI}rollPayment`),
    getIncome: () => axios.get(`${baseAPI}rollPayment/income`),
    getRollPaymentById: (id: number) => axios.get(`${baseAPI}rollPayment/${id}`),
    createRollPayment: (values: Client_RollPayment) => axios.post(`${baseAPI}rollPayment`, values),
    updateRollPayment: (values: Client_RollPayment) => axios.put(`${baseAPI}rollPayment/${values.id}`, values),
    removeRollPayment: (id: number) => axios.delete(`${baseAPI}rollPayment/${id}`),
    //#endregion
};
