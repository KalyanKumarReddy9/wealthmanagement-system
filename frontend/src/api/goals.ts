import api from './client';
import type { Goal } from '../obj/types';

export const getGoals = async (): Promise<Goal[]> => {
    const response = await api.get<Goal[]>('/goals');
    return response.data;
};

export const createGoal = async (data: Omit<Goal, 'id' | 'user_id' | 'current_amount' | 'completed'> & { current_amount?: number }): Promise<Goal> => {
    const response = await api.post<Goal>('/goals', data);
    return response.data;
};
