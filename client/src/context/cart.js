import { useState, useContext, createContext,useEffect} from "react";
const CartContext = createContext()

const CartProvider = ({children}) =>{
    const [cart,setCart] = useState([])

    useEffect(() =>{
       const existingCart = localStorage.getItem('cart') 
       setCart(JSON.parse(existingCart))
    },[])

    return (
        <CartContext.Provider value={[cart,setCart]}>
            {children}
        </CartContext.Provider>
    )
}

const useCart = () => useContext(CartContext)
export {useCart,CartProvider}
 