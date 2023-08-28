'use client'

import { ReactNode, createContext, useContext, useState } from 'react';

const AuthContext = createContext({ user: null, updateUser: (newUser: any) => {} });


interface AuthProviderProps{
    children: ReactNode
}

export const AuthProvider : React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<any>(null);

    return (
        <AuthContext.Provider value={{ user, updateUser: (newUser: any) => setUser(newUser) }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => useContext(AuthContext);
