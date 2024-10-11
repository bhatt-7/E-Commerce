import { useState } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

const AddProduct = () => {
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
            const response = await axios.post('http://localhost:5000/api/products/create', productData);
            if (response.status === 201) {
                toast.success("Product added successfully!");
                setProductData({
                    title: '',
                    description: '',
                    price: '',
                    image: ''
                });
            }
        } catch (error) {
            toast.error("Failed to add product");
        }
    };

    return (
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
    );
};

export default AddProduct;
