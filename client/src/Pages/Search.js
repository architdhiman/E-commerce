import React from 'react'
import Layout from '../Components/Layout/Layout'
import {useSearch} from '../context/search.js'
import { useNavigate } from 'react-router-dom'

const Search = () => {
  const[values,setValues] = useSearch()
  const navigate = useNavigate()
  return (
    <Layout>
      <div className='container'>
        <div className='text-center'>
          <h1>Search Result</h1>
          <h6>{values.results.length === 0 ? "No product found": `${values.results.length} found`}</h6>
          <div className="d-flex flex-wrap">
            {values?.results.map((p) => (
              <div className="card m-2" style={{ width: "18rem" }}>
                <img
                  src={`http://localhost:8080/api/v1/product/product-photo/${p._id}`}
                  className="card-img-top"
                  alt={p.name}
                />
                <div className="card-body">
                  <h5 className="card-title">{p.name}</h5>
                  <p className="card-text">
                    {p.description.substring(0, 30)}...
                  </p>
                  <p className="card-text"> $ {p.price}</p>
                  <button class="btn btn-primary ms-1" onClick={()=>navigate(`/product/${p.slug}`)}>More Details</button>
                  <button class="btn btn-secondary ms-1">ADD TO CART</button>
                </div>
              </div>
            ))}
          </div>  
        </div>
      </div>
    </Layout>
  )
}

export default Search
