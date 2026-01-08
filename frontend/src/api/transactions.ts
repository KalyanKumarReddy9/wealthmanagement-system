import api from './client';
import type { Transaction } from '../obj/types';

export const getTransactions = async (): Promise<Transaction[]> => {
    const response = await api.get<Transaction[]>('/transactions');
    return response.data;
};

export const createTransaction = async (data: Omit<Transaction, 'id' | 'user_id' | 'date'>): Promise<Transaction> => {
    // Current backend expects date to be auto-generated or passed?
    // Checking schema: date is default_factory=datetime.now in model, but schema has it as field. 
    // In schemas.py: TransactionCreate(TransactionBase), TransactionBase has amount, type, category, description.
    // Date is NOT in TransactionBase. It's added in Transaction model.
    // So we don't send date from frontend for now, let backend handle it.
    const response = await api.post<Transaction>('/transactions', data);
    return response.data;
};
