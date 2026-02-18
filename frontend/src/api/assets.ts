import api from './client';
import type { Asset } from '../obj/types';

export interface AssetCreateData {
    name: string;
    type: string;
    current_value: number;
    purchase_date?: string;
    notes?: string;
}

export interface AssetUpdateData {
    name?: string;
    type?: string;
    current_value?: number;
    purchase_date?: string;
    notes?: string;
}

export const assetsApi = {
    getAll: async (): Promise<Asset[]> => {
        const response = await api.get<Asset[]>('/assets');
        return response.data;
    },

    create: async (assetData: AssetCreateData): Promise<Asset> => {
        const response = await api.post<Asset>('/assets', assetData);
        return response.data;
    },

    update: async (id: string, assetData: AssetUpdateData): Promise<Asset> => {
        const response = await api.put<Asset>(`/assets/${id}`, assetData);
        return response.data;
    },

    delete: async (id: string): Promise<void> => {
        await api.delete(`/assets/${id}`);
    },

    getById: async (id: string): Promise<Asset> => {
        const response = await api.get<Asset>(`/assets/${id}`);
        return response.data;
    }
};