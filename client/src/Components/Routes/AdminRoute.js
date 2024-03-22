import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/auth'
import axios from 'axios'
import { Outlet } from 'react-router-dom'
import Spinner from '../Spinner'

export const AdminRoute = () => {
  const[auth,setAuth] = useAuth()
  const[ok,setOk] = useState(false)
    useEffect(() =>{
        const authCheck = async() =>{
            const res = await axios.get('http://localhost:8080/api/v1/auth/admin-auth')
            if(res.data.ok) {
                setOk(true)
            }
            else {
                setOk(false)
            }
        }
        if(auth?.token) authCheck() // if we didn't get any token then authcheck will not be called , it will be called only if any change in auth has happened and when will it be checked ? whenever any change in auth happens
    },[auth?.token])
    return ok ? <Outlet/> : <Spinner path=''/>

}


