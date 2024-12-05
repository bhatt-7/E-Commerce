import { Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar"
import { Route,useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import VerifyOtp from "./pages/VerifyOtp"
import Dashboard from "./pages/Dashboard";
import AddProduct from "./components/AddProduct";
import AdminDashboard from "./pages/AdminDashboard";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import AdminProducts from "./pages/AdminProducts";
import Orders from "./pages/Orders";
const App = () => {

  const location = useLocation();
  const navigate = useNavigate();

  // useEffect(() => {
    
  //   const userRole = localStorage.getItem("role"); 
  //   if (userRole === "admin") {
      
  //     navigate("/admin-dashboard");
  //   }
    
  // }, []);

  return (
    <div >
      {/* Apply inline style to hide Navbar if route is '/admin-dashboard' */}
      <div className="bg-black" style={{ display: location.pathname === '/admin-dashboard'|| location.pathname === '/admin/products' ||
        location.pathname === '/add-product' ? 'none' : 'block' }}>
        <Navbar />
      </div>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/verify-otp" element={<VerifyOtp />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/:token" element={<ResetPassword />} />
        <Route path='/admin/products' element={<AdminProducts />} />
        <Route path="/orders" element={<Orders/>}/>
      </Routes>
    </div>
  )
};

export default App;
