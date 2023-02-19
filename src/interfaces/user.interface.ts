export interface UserResult {
    data: User[];
    config: any;
    headers: any;
    request: any;
    status: 200;
    statusText: string;
}

export interface User {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    password: string;
    age: number;
    role: number;
}
