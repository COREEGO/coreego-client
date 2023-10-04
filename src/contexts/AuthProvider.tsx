'use client'

import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../http-common/apiFetch';
import { redirect, useLocation, useNavigate } from "react-router"



const AuthContext = createContext({
    user: null,
    error: '',
    authentificate: () => { },
    login: (username: any, password: any) => { },
    logout: () => { }
});

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<any>(null)
    const [error, setError] = useState<any>('')

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
        setError('')
        await apiFetch('/login', 'POST', {
            username, password
        }).then((user: any) => {
            setUser(user)
            if(user){
                navigate('/', {replace: true} )
            }
        }).catch((error: any) => {
            setError(JSON.parse(error.message).error)
        })
    }

    const logout = async () => {
        await apiFetch('/logout', 'post').then((res: any) => {
            setUser(res)
            navigate("/login")
        }).catch((e: any) => {
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
