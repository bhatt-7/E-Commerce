import { React, useState,useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Spinner from "../components/Spinner";
import Product from "../components/Product";
import AdminProduct from '../components/AdminProduct';
import axios from 'axios';
function AdminProducts() {
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    async function fetchProducts() {
        setLoading(true);
        try {
            const response = await axios.get('http://localhost:5000/api/products/my-products', {
                withCredentials: true 
            });
            setProducts(response.data); 
        } catch (error) {
            console.log("Error fetching products:", error);
            setProducts([]);
        } finally {
            setLoading(false);
        }
    }
    
    useEffect(() => {
        fetchProducts();
    }, []);


    const role = localStorage.getItem('role'); 
    
    if (role !== 'admin') {
        navigate('/');  
        return null;
    }

    
    const handleLogout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        localStorage.setItem('isLoggedIn', 'false'); // Update login status
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'; // Clear cookies

        window.dispatchEvent(new Event("storage"));

        try {
            await axios.post('http://localhost:5000/api/users/logout', { withCredentials: true });
        } catch (error) {
            console.log(error);
        }

        navigate('/');
    };

    const removeProductFromList = (productId) => {
        setProducts(products.filter(product => product._id !== productId));
    };
    const updateProductInList = (updatedProduct) => {
        setProducts(products.map(product => product._id === updatedProduct._id ? updatedProduct : product));
    };

    return (
        <div>
            {/* Navbar */}
            <nav className="flex justify-between items-center h-16 bg-gray-800 text-white px-10">
                <div className="flex space-x-6">
                    <NavLink to="/admin/products" className="hover:text-yellow-500 transition">
                        Products
                    </NavLink>
                    <NavLink to="/admin-dashboard" className="hover:text-yellow-500 transition">
                        Dashboard
                    </NavLink>
                </div>
                <button
                    onClick={handleLogout}
                    className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
                >
                    Logout
                </button>
            </nav>

            <div>
            {loading ? <Spinner /> :
                products.length > 0 ? (
                    <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 max-w-6xl p-2 mx-auto space-y-10 space-x-5 min-h-[80vh]">
                        {products.map((product) => (
                            <AdminProduct key={product._id} post={product} removeProductFromList={removeProductFromList} 
                            updateProductInList={updateProductInList}/>
                        ))}
                    </div>
                ) : (
                    <div className="flex justify-center items-center">
                        <p>No Data Found</p>
                    </div>
                )}
        </div>
        </div>
    );
}

export default AdminProducts;
