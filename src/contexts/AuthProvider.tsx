'use client'

import React, { ReactNode, createContext, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from "react-router"
import axios from '../http-common/axiosInstance';
import { BEARER_HEADERS, TOKEN } from '../utils/variables';
import { toast } from 'react-toastify';

const AuthContext = createContext({});

interface AuthProviderProps {
    children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const [user, setUser] = useState<any>(null)
    const navigate = useNavigate()

    const authentification = async () => {
        try {
            const response: any = await axios.get('/me', BEARER_HEADERS)
            setUser(response.data)
        } catch (error: any) {
           //
        }
    };


    const logout = useCallback(async () => {
        try {
            await axios.post('/logout', null, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            localStorage.removeItem('token')
            setUser(null)
            navigate('/login')
        } catch (error: any) {
            console.error(error.message)
        }
    }, [])

    return (
        <AuthContext.Provider value={{ user, setUser, logout, authentification }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
