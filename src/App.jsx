import { Routes } from "react-router-dom";
import Navbar from "./components/Navbar"
import { Route } from "react-router-dom";
import Home from "./pages/Home"
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import SignUp from "./pages/SignUp"
import VerifyOtp from "./pages/VerifyOtp"
import Dashboard from "./pages/Dashboard";
const App = () => {
  return (<div>
    <div className="bg-black">
      <Navbar />
    </div>
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} index />
      <Route path="/" element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path='/verify-otp' element={<VerifyOtp />} />
    </Routes>
  </div>)
};

export default App;
