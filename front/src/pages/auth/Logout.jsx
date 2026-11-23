import { useContext } from 'react'
import { Navigate } from 'react-router'
import { useLogout } from '../../context/Session.Context.jsx'

export default function Logout() {
  
  const logout = useLogout()
  logout()

  return <Navigate to="/login" />
}