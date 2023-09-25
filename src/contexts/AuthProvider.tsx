'use client'

import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../http-common/apiFetch';
import { redirect, useLocation, useNavigate } from "react-router"



const AuthContext = createContext({
    user: null,
    error: '',
    authentificate: () => { },
    login: (username: any, password: any) => { },
    logout: () => {}
});

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<any>(null)
    const [error, setError] = useState<string>('')

    const navigate = useNavigate()

    const authentificate = async () => {
        await apiFetch('/me', 'GET').then((user: any) => {
            setUser(user)
        }).catch((error: any) => setError(error))
    }

    const login = async (username: string, password: string) => {
        await apiFetch('/login', 'POST', {
            username, password
        }).then((user: any) => {
            setUser(user)
            navigate("/")
        }).catch((error: any) => {
            setError(error.message)
        })
    }

    const logout = async () => {
        await apiFetch('/logout', 'post').then((res:any) => {
            console.log(res)
            setUser(res)
            navigate("/login")
        }).catch((e:any) => {
            console.log(e)
        })
    }


    return (
        <AuthContext.Provider value={{ user, error, authentificate, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
