import api from './client';
import type { LoginCredentials, RegisterCredentials, User, AuthResponse } from '../obj/types'; // We'll create types next

export const loginUser = async (credentials: LoginCredentials): Promise<AuthResponse> => {
    // OAuth2PasswordRequestForm expects form-data encoded body
    const formData = new FormData();
    formData.append('username', credentials.email);
    formData.append('password', credentials.password);

    const response = await api.post<AuthResponse>('/auth/token', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
};

export const registerUser = async (data: RegisterCredentials): Promise<User> => {
    const response = await api.post<User>('/auth/register', data);
    return response.data;
};
