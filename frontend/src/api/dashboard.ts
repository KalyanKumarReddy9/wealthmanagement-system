import api from './client';

export interface DashboardSummary {
    net_worth: number;
    monthly_income: number;
    monthly_expenses: number;
    category_expenses: { name: string; value: number }[];
    monthly_series?: { name: string; value: number }[];
    user_name?: string;
}

export const getDashboardSummary = async (): Promise<DashboardSummary> => {
    const response = await api.get<DashboardSummary>('/dashboard/summary');
    return response.data;
};
