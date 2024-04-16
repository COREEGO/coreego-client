'use client'

import React, { createContext, useContext } from 'react'
import { useNavigate } from 'react-router'
import { BEARER_HEADERS, removeToken } from '../utils/variables'
import axios from 'axios'

const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = React.useState(null)
  const navigate = useNavigate()

  const authentification = React.useCallback(async () => {
    try {
      const response = await axios.get('/me', BEARER_HEADERS)
      setAuth(response.data)
    } catch (error) {}
  }, [])

  const logout = React.useCallback(async () => {
    try {
      await axios.post('/logout', null, BEARER_HEADERS)
      removeToken()
      setAuth(null)
      navigate('/login')
    } catch (error) {}
  }, [])

  return (
    <AuthContext.Provider
      value={{ auth, setAuth, logout, authentification }}
		>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
