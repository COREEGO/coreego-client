'use client'

import React, { createContext, useContext } from 'react';
import { useNavigate } from "react-router"
import { BEARER_HEADERS } from '../utils/variables';
import axios from 'axios';

const AuthContext = createContext({});


export const AuthProvider = ({ children }) => {

    const [user, setUser] = React.useState(null)
    const navigate = useNavigate()


    const authentification = React.useCallback(async () => {
        try {
            const response = await axios.get('/me', BEARER_HEADERS)
            setUser(response.data)
        } catch (error) {
            console.error(error.message)
        }
    }, [])

    const logout = React.useCallback(async () => {
        try {
            await axios.post('/logout', null, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`
                }
            })
            localStorage.removeItem('token')
            setUser(null)
            navigate('/login')
        } catch (error) {
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
