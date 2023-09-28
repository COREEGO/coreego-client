'use client'

import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../http-common/apiFetch';
import { redirect, useLocation, useNavigate } from "react-router"



const AuthContext = createContext({
    user: null,
    error: null,
    successMessage: '',
    authentificate: () => { },
    login: (username: any, password: any) => { },
    logout: () => { }
});

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<any>(null)
    const [error, setError] = useState<any>()
    const [successMessage, setSuccessMessage] = useState<string>('')

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        setError(null)
    }, [location])

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
            setError("L'email ou le mot de passe est incorrect")
        })
    }

    const logout = async () => {
        await apiFetch('/logout', 'post').then((res: any) => {
            console.log(res)
            setUser(res)
            navigate("/login")
        }).catch((e: any) => {
            console.log(e)
        })
    }


    return (
        <AuthContext.Provider value={{ user, error, successMessage, authentificate, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
