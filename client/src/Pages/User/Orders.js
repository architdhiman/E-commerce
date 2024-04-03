import React, { useEffect, useState } from "react";
import UserMenu from "../../Components/Layout/UserMenu";
import Layout from "../../Components/Layout/Layout";
import axios from "axios";
import { useAuth } from "../../context/auth";

const Orders = () => {
  const[orders,setOrders] = useState([])
  const [auth,setAuth] = useAuth()

  const getOrders = () => {
    try {
      const {data} = axios.get(`http://localhost:8080/api/v1/auth/orders`)
      setOrders(data)      
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(()=>{
    if(auth?.token) getOrders()
  },[auth?.token])

  return (
    <Layout title={"Your Orders"}>
      <div className="container-flui p-3 m-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <h1>All Orders</h1>
            {orders}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;