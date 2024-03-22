import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage';
import About from './Pages/About';
import Contact from './Pages/Contact';
import PageNotFound from './Pages/PageNotFound';
import Policy from './Pages/Policy';
import Register from './Pages/Auth/Register';
import 'react-toastify/dist/ReactToastify.css';
import Login from './Pages/Auth/Login';
import AdminDashboard from './Pages/Admin/AdminDashboard';
import Dashboard from './Pages/User/Dashboard';
import { ToastContainer} from 'react-toastify';
import { PrivateRoute } from './Components/Routes/Private';
import ForgotPassword from './Pages/Auth/ForgotPassword';
import CreateCategory from './Pages/Admin/CreateCategory';
import CreateProduct from './Pages/Admin/CreateProduct';
import Users from './Pages/Admin/Users';
import Orders from './Pages/User/Orders';
import Profile from './Pages/User/Profile';
import Products from './Pages/Admin/Products';
import UpdateProduct from './Pages/Admin/UpdateProduct';
import Search from './Pages/Search';
import CartPage from './Pages/CartPage';
import { ProductDetails } from './Pages/ProductDetails';
import Categories from './Pages/Categories';
import CategoryProduct from './Pages/CategoryProduct';

function App() {
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path="/" element={<HomePage/>}></Route>
      <Route path="/search" element={<Search/>}></Route>
      <Route path="/categories" element={<Categories/>}></Route>
      <Route path="/cart" element={<CartPage/>}></Route>
      <Route path="/category/:slug" element={<CategoryProduct/>}></Route>
      <Route path="/product/:slug" element={<ProductDetails/>}></Route>
      <Route path="/about" element={<About/>}></Route>
          {/* for guest i also want them to browser wihout signin, if already signed in ? useEffect will fetch it to know admin or user */}
      <Route path="/dashboard" element={<PrivateRoute/>}> 
          <Route path='user' element={<Dashboard/>}/>
          <Route path='user/orders' element={<Orders/>}/>
          <Route path='user/profile' element={<Profile/>}/> 
      </Route>
      <Route path="/dashboard" element={<PrivateRoute/>}>
          <Route path='admin' element={<AdminDashboard/>}/> 
          <Route path='admin/create-category' element={<CreateCategory/>}/>
          <Route path='admin/create-product' element={<CreateProduct/>}/>
          <Route path='admin/product/:slug' element={<UpdateProduct/>}/>
          <Route path='admin/products' element={<Products/>}/> 
          <Route path='admin/users' element={<Users/>}/>   
      </Route>      
      <Route path="/login" element={<Login/>}></Route>
      <Route path="/forgot-password" element={<ForgotPassword/>}/>
      <Route path="/register" element={<Register/>}></Route>
      <Route path="/contact" element={<Contact/>}></Route>
      <Route path="/policy" element={<Policy/>}></Route>
      <Route path="*" element={<PageNotFound/>}></Route>
    </Routes>
    </>
  );
}

export default App;
