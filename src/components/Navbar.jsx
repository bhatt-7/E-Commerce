import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Navbar = () => {
  const { cart } = useSelector((state) => state);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Check login status from localStorage
  // useEffect(() => {
  //   const loggedIn = localStorage.getItem('isLoggedIn')==true
  //   setIsLoggedIn(loggedIn);
  // }, [ localStorage.getItem('isLoggedIn')]);  

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    setIsLoggedIn(loggedIn);

    // Listen for storage changes across tabs or windows
    const handleStorageChange = () => {
      const updatedLoginStatus = localStorage.getItem('isLoggedIn') === 'true';
      setIsLoggedIn(updatedLoginStatus);
    };

    window.addEventListener('storage', handleStorageChange);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []); // Only run once on mount


  // Handle Logout
  // const handleLogout = () => {
  //   localStorage.removeItem('token');
  //   localStorage.removeItem('email');
  //   localStorage.setItem('isLoggedIn', 'false'); // Update login status

  //   setIsLoggedIn(false);
  //   navigate('/');
  // };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
    localStorage.removeItem('role');
    localStorage.setItem('isLoggedIn', 'false'); // Update login status
    //clear cookie on logout
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    // Manually update the state
    setIsLoggedIn(false);
    window.dispatchEvent(new Event("storage")); 
    const response = axios.post('http://localhost:5000/api/users/logout', {
      withCredentials: true
    })
    .then((response) => {
      console.log(response);
    })
    .catch((error) => {
      console.log(error);
    });
    navigate('/');
  };


  return (
    <div>
      <nav className="flex justify-between items-center h-20 max-w-6xl mx-auto">
        <NavLink to="/">
          <div className="ml-5">
            <img src="../logo.png" className="h-20" />
          </div>
        </NavLink>

        <div className="flex items-center font-medium text-slate-100 mr-5 space-x-6">
          <NavLink to="/dashboard">
            <p>Dashboard</p>
          </NavLink>

          <NavLink to="/cart">
            <div className="relative">
              <FaShoppingCart className="text-2xl" />
              {cart.length > 0 && (
                <span
                  className="absolute -top-1 -right-2 bg-yellow-600 text-xs w-5 h-5 flex 
                    justify-center items-center animate-bounce rounded-full text-white"
                >
                  {cart.length}
                </span>
              )}
            </div>  
          </NavLink>

          {!isLoggedIn ? (
            <>
              <NavLink to="/login">
                <p>Login</p>
              </NavLink>
              <NavLink to="/signup">
                <p>Signup</p>
              </NavLink>
            </>
          ) : (
            <button onClick={handleLogout} className="text-white">
              Logout
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
