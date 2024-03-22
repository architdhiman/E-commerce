import React, { useState,useEffect } from 'react'
import Layout from '../../Components/Layout/Layout'
import AdminMenu from '../../Components/Layout/AdminMenu'
import axios from 'axios'
import { Link } from 'react-router-dom'
const Products = () => {
    const [products,setProducts] = useState([])

    const getAllProducts = async(req,res) =>{
        try {
            const {data} = await axios.get('http://localhost:8080/api/v1/product/get-product')
            setProducts(data.products)
        } catch (error) {
            console.log(error)            
        }
    }

useEffect(() =>{
        getAllProducts()
}, [])
  return (
    <Layout>
    <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>
        </div>
        <div className='col-md-9'>
            <h1 className='text-center'>All Products List</h1>
            <div className='d-flex'>
            {products?.map((product) =>(
                <Link key={product._id}  className="product-link  display:flex flex-direction:column flex-wrap:wrap " to={`/dashboard/admin/product/${product.slug}`} >
                <div className="card m-4" style={{width: '18rem'}} key={product._id}>
                 <img className="card-img-top" src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`} alt="Card image cap" />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">{product.description}</p>      
                  </div>
                </div>
                </Link>
            ))}                     
            </div>    
        </div>
    </div>
    </Layout>
  )
}

export default Products
