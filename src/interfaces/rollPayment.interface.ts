import { Villa } from "./villa.interface";

export interface Client {
    id?: number;
    full_name: string;
    email: string;
    phone: string;
    guests: number,

    createdAt?: Date;
    updatedAt?: Date;
}

export interface Roll_Payment {
    id: number;
    amount: number;
    guests: number;
    checkin: string;
    checkout: string;
    no_prepayment: boolean,
    deposit: boolean,
    full_prepayment: boolean,

    createdAt: Date;
    updatedAt: Date;

    readonly client: Client;
    readonly villa: Villa;
}

export interface Client_RollPayment {
    id: number,
    amount: number,
    guests: number,
    checkin: string,
    checkout: string,
    no_prepayment: boolean,
    deposit: boolean,
    full_prepayment: boolean,

    villa: Villa,
    client: Client
} 