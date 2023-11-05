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
        }).catch((error: any) => localStorage.removeItem('token'))
    }

    const login = async (username: string, password: string) => {
        setError('')

        try {
            const response : any = await apiFetch('/login', 'POST', {username, password})
            if(response){
                localStorage.setItem('token', response.token)
                await authentificate()
                navigate('/', {replace: true} )
            }
        } catch (error:any) {
            console.log(error.message)
            setError(JSON.parse(error.message).error)
        }
    }

    const logout = async () => {
        await apiFetch('/token/invalidate', 'post').then((res: any) => {
            localStorage.removeItem('token')
            navigate("/login")
        }).catch((e: any) => {
            console.log(e)
        })
        authentificate()
    }


    return (
        <AuthContext.Provider value={{ user, error, authentificate, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
