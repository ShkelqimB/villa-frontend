export interface VillaResult {
    data: Villa[];
    config: any;
    headers: any;
    request: any;
    status: 200;
    statusText: string;
}

export interface Villa {
    id: number;
    name: string;
    price: number;
    guests: number;
    image?: string;
}
