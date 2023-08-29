'use client'

import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../http-common/apiFetch';



const AuthContext = createContext({
    user: null,
    authentificate: () => {} ,
    login: (username: any, password: any) => {}
});

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<any>(null)

    const authentificate = async () => {
      await apiFetch('/me', 'GET').then((user: any) => {
            setUser(user)
        }).catch((error: any) => console.error(error))
    }

    const login = useCallback(async (username: any, password: any) => {
        await apiFetch('/login', 'POST', {
            username, password
        }).then((user: any) => {
            setUser(user)
        }).catch((error: any) => console.error(error))
    }, [])


    return (
        <AuthContext.Provider value={{ user, authentificate, login }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
