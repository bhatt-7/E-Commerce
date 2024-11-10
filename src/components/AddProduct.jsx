import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useNavigate, NavLink } from "react-router-dom";
const AddProduct = () => {

    const navigate = useNavigate();
    const [productData, setProductData] = useState({
        title: '',
        description: '',
        price: '',
        image: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductData({ ...productData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/products/create', productData, {
                withCredentials: true
            });
            console.log(response.status)
            if (response.status === 201) {
                setProductData({
                    title: '',
                    description: '',
                    price: '',
                    image: ''
                });
                navigate('/admin/products');
                toast.success("Product added successfully!");
            } else {
                toast.error("Error adding product");
            }
        } catch (error) {

        }
    };

    const handleLogout = async () => {
        localStorage.removeItem('token');
        localStorage.removeItem('email');
        localStorage.removeItem('role');
        localStorage.setItem('isLoggedIn', 'false'); // Update login status
        document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        window.dispatchEvent(new Event("storage"));

        try {
            await axios.post('http://localhost:5000/api/users/logout', { withCredentials: true });
        } catch (error) {
            console.log(error);
        }

        navigate('/');
    };

    return (
        <>
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
            <div className="flex justify-center items-center h-screen bg-gray-100">
                <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold text-center mb-6">Add Product</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label className="block text-gray-700">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={productData.title}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Description</label>
                            <input
                                type="text"
                                name="description"
                                value={productData.description}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Price</label>
                            <input
                                type="number"
                                name="price"
                                value={productData.price}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label className="block text-gray-700">Image URL</label>
                            <input
                                type="text"
                                name="image"
                                value={productData.image}
                                onChange={handleChange}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                        >
                            Add Product
                        </button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default AddProduct;
