'use client'

import { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { apiFetch } from '../http-common/apiFetch';
import { redirect, useLocation, useNavigate } from "react-router"



const AuthContext = createContext({
    user: null,
    error: '',
    authentificate: () => { },
    login: (username: any, password: any) => { },
    logout: () => { },
    refreshToken: () => { }
});

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<any>(null)
    const [error, setError] = useState<any>('')

    const navigate = useNavigate()

    const refresh_token = localStorage.getItem('refresh_token')


    const authentificate = async () => {
        await apiFetch('/me', 'GET').then((user: any) => {
            setUser(user)
        }).catch((error: any) => {
            const message = JSON.parse(error.message)
            console.log(message)
        })
    }

    const refreshToken = async () => {
        if (refresh_token) {
            try {
                const response : any = await apiFetch('/token/refresh', 'post', {
                    refresh_token: localStorage.getItem('refresh_token')
                })
                if (response) {
                    localStorage.setItem('access_token', response.token)
                    localStorage.setItem('refresh_token', response.refresh_token)
                    await authentificate()
                }
            } catch (error: any) {
                console.log(error.message)
            }
        }
    }

    const login = async (username: string, password: string) => {
        setError('')
        try {
            const response: any = await apiFetch('/login', 'POST', { username, password })
            if (response) {
                localStorage.setItem('access_token', response.token)
                localStorage.setItem('refresh_token', response.refresh_token)
                await authentificate()
                navigate('/')
            }
        } catch (error: any) {
            setError(JSON.parse(error.message).message)
        }
    }

    const logout = async () => {
        await apiFetch('/token/invalidate', 'post').then((res: any) => {
            localStorage.removeItem('access_token')
            localStorage.removeItem('refresh_token')
            authentificate()
            navigate("/login")
        }).catch((e: any) => {
            console.log(e)
        })
    }


    return (
        <AuthContext.Provider value={{ user, error, authentificate, login, logout, refreshToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
