import React from 'react'
import Header from './Header'
import Footer from './Footer'
import {Helmet} from "react-helmet"
import 'react-toastify/dist/ReactToastify.css';
const Layout = ({children,title,description,keywords,author}) => {
  return (
    <>
    {/* helmet is for SEO */}
    <Helmet>
    <meta charset="UTF-8"/>
  <meta name="description" content={description}/>
  <meta name="keywords" content={keywords}/>
  <meta name="author" content={author}/>
  <title>{title}</title>
    </Helmet>
    <Header/>
    <main style={{minHeight:'85vh'}}>     
    {children} 
    </main>
    
      <Footer/>
    </>
  )
}

export default Layout
