export interface Client {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    guests: number;

    createdAt: Date;
    updatedAt: Date;
}