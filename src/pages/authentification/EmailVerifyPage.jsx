import { useEffect } from 'react'
import { Navigate, useLocation } from 'react-router'
import axios from 'axios'

const EmailVerifyPage = () => {
  const location = useLocation()

  useEffect(() => {
    onVerifyAccount()
  }, [])

  const onVerifyAccount = async () => {
    try {
      await axios.post(`/email-verify${location.search}`)
    } catch (error) {}
  }
  return <Navigate to='/login' />
}

export default EmailVerifyPage
