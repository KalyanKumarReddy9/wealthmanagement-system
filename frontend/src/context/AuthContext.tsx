import { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { User, LoginCredentials, RegisterCredentials } from '../obj/types';
import { loginUser as apiLogin, registerUser as apiRegister } from '../api/auth';

interface AuthContextType {
    user: User | null;
    token: string | null;
    login: (credentials: LoginCredentials) => Promise<void>;
    signup: (data: RegisterCredentials) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(JSON.parse(storedUser));
        }
        setIsLoading(false);
    }, []);

    const login = async (credentials: LoginCredentials) => {
        try {
            const data = await apiLogin(credentials);
            if (data.access_token) {
                localStorage.setItem('token', data.access_token);
                setToken(data.access_token);

                // Decode token or fetch user details. For now, mock based on input.
                // In a real app, you'd fetch /me here.
                const mockUser: User = {
                    id: '1', // Placeholder
                    name: 'User',
                    email: credentials.email
                };
                localStorage.setItem('user', JSON.stringify(mockUser));
                setUser(mockUser);
            }
        } catch (error) {
            console.error('Login failed', error);
            throw error;
        }
    };

    const signup = async (data: RegisterCredentials) => {
        try {
            await apiRegister(data);
            // After signup, user usually needs to login. 
            // We can auto-login or redirect to login page.
        } catch (error) {
            // Try to extract server error message
            const errMessage = (error as any)?.response?.data?.detail || (error as any)?.message || 'Signup failed';
            console.error('Signup failed', errMessage);
            throw new Error(errMessage);
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            token,
            login,
            signup,
            logout,
            isAuthenticated: !!token,
            isLoading
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
