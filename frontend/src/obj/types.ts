export interface User {
    id: string;
    name: string;
    email: string;
    created_at?: string;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials {
    name: string;
    email: string;
    password: string;
}

export interface AuthResponse {
    access_token: string;
    token_type: string;
}

export interface Transaction {
    id: string;
    user_id: string;
    amount: number;
    type: 'income' | 'expense';
    category: string;
    description?: string;
    date: string;
}

export interface Goal {
    id: string;
    user_id: string;
    name: string;
    target_amount: number;
    current_amount: number;
    deadline?: string;
    completed: boolean;
}

export interface Asset {
    id: string;
    user_id: string;
    name: string;
    type: string;
    current_value: number;
    purchase_date?: string;
    notes?: string;
    created_at: string;
}
