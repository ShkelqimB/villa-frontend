import axios from "axios";
import { Expense } from "../interfaces/expense.interface";
import { Client, Client_RollPayment } from "../interfaces/rollPayment.interface";
import { User } from "../interfaces/user.interface";

// const baseAPI = `http://localhost:5000/api/`;
const baseAPI = `https://villa-backend-api.herokuapp.com/api/`;

// eslint-disable-next-line import/no-anonymous-default-export
export default {
    //#region Auth
    login: (values: any) => axios.post(`${baseAPI}authentication/login`, values),
    logout: () => axios.post(`${baseAPI}authentication/logout`, null),
    //#endregion
    //#region Villa API
    getAllClients: () => axios.get(`${baseAPI}client`),
    getClientById: (id: number) => axios.get(`${baseAPI}client/${id}`),
    createClient: (values: any) => axios.post(`${baseAPI}client`, values),
    updateClient: (values: Client) => axios.put(`${baseAPI}client/${values.id}`, values),
    removeClient: (id: number) => axios.delete(`${baseAPI}client/${id}`),
    //#endregion
    //#region Villa API
    getAllVillas: () => axios.get(`${baseAPI}villa`),
    getVillaById: (id: number) => axios.get(`${baseAPI}villa/${id}`),
    createVilla: (formdata: FormData) => axios.post(`${baseAPI}villa`, formdata),
    updateVilla: (id: number, values: FormData) => axios.put(`${baseAPI}villa/${id}`, values),
    removeVilla: (id: number) => axios.delete(`${baseAPI}villa/${id}`),
    //#endregion
    //#region User API
    getAllUsers: () => axios.get(`${baseAPI}user`),
    getUserByToken: (token: string | null) => axios.post(`${baseAPI}user/me`, { token }),
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
