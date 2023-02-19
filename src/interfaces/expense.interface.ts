export interface ExpenseResult {
    data: Expense[],
    config: any,
    headers: any,
    request: any,
    status: 200,
    statusText: string
}

export interface Expense {
    id: number;
    name: string;
    description: string;
    date: Date;
    total: number;
}