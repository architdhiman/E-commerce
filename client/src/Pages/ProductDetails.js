import React from 'react'
import { useState, useEffect } from 'react'
import Layout from '../Components/Layout/Layout'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

export const ProductDetails = () => {
    const[product,setProduct] = useState({})
    const[relatedProducts,setRelatedProducts] = useState([])
    const params = useParams()

    useEffect(()=>{
        if(params?.slug)  {
            getProduct()
        }
    },[params?.slug])
    const navigate = useNavigate()

    const getProduct = async () =>{
        try {
            const {data} = await axios.get(`http://localhost:8080/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            getSimilarProduct(data?.product._id,data?.product.category._id)            
        } catch (error) {
            console.log(error)            
        }
    }

    const getSimilarProduct = async(pid,cid) =>{
      try {
        const {data} = await axios.get(`http://localhost:8080/api/v1/product/related-product/${pid}/${cid}`)
        console.log(data?.products)
        setRelatedProducts(data?.products)
      } catch (error) {
        console.log(error)     
      }
    }
    return (
      <Layout>
      <div className="row container mt-2">
        <div className="col-md-5">
          <img
            src={`http://localhost:8080/api/v1/product/product-photo/${product._id}`}
            className="card-img-top"
            alt={product.name}
            height="480"
            width={"200px"}
          />
        </div>
        <div className="col-md-6 ">
          <h1 className="text-center">Product Details</h1>
          <h6>Name : {product.name}</h6>
          <h6>Description : {product.description}</h6>
          <h6>Price : {product.price}</h6>
          <h6>Category : {product?.category?.name}</h6>
          <button class="btn btn-secondary ms-1">ADD TO CART</button>
        </div>
      </div>
      <hr />
      <div className="row container">
        <h6>Similar Products</h6>
        {relatedProducts.length < 1 && (
          <p className="text-center">No Similar Products found</p>
        )}
        <div className="d-flex flex-wrap">
          {relatedProducts?.map((p) => (
            <div className="card m-2" style={{ width: "18rem" }}>
              <img
                src={`http://localhost:8080/api/v1/product/product-photo/${p?._id}`}
                className="card-img-top"
                alt={p.name}
              />
              <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description.substring(0, 30)}...</p>
                <p className="card-text"> $ {p.price}</p>
                <button
                  className="btn btn-primary ms-1"
                  onClick={() => navigate(`/product/${p.slug}`)}
                >
                  More Details
                </button>
                <button class="btn btn-secondary ms-1">ADD TO CART</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
      );
}


