import React, { useState, useEffect } from 'react'
import { jwtDecode} from 'jwt-decode'
import { Navigate, useLocation } from 'react-router-dom'
import api from '../../api'
import Spinner from './Spinner'



const ProtectedRoute = ({ children }) => {
  const [isAuthorised, setIsAuthorised] = useState(null)
  const location = useLocation()





  // Refresh access token using refresh token
  async function refreshToken() {
    const refreshToken = localStorage.getItem("refresh")
    if (!refreshToken) {
      setIsAuthorised(false)
      return
    }

    try {
      const res = await api.post("/token/refresh/", {
        refresh: refreshToken,
      })

      if (res.status === 200) {
        localStorage.setItem("access", res.data.access)
        setIsAuthorised(true)
      } else {
        setIsAuthorised(false)
      }
    } catch (err) {
      console.error("Error refreshing token:", err)
      setIsAuthorised(false)
    }
  }

  // Check access token validity
  async function auth() {
    const token = localStorage.getItem("access")

    if (!token) {
      setIsAuthorised(false)
      return <Spinner />
    }

    try {
      const decoded = jwtDecode(token)
      const expiryTime = decoded.exp
      const currentTime = Date.now() / 1000

      if (currentTime > expiryTime) {
        await refreshToken()
      } else {
        setIsAuthorised(true)
      }
    } catch (err) {
      console.error("Invalid access token:", err)
      setIsAuthorised(false)
    }
  }

  useEffect(() => {
    auth().catch(() => setIsAuthorised(false))
  } )

  if (isAuthorised === null) {
    return <div>Loading...</div>
  }

  if (isAuthorised === false) {
    return <Navigate to="/login"  state= {{from : location }}  replace/>
  }

  return <>{children}</>
}

export default ProtectedRoute
