import axios from 'axios';
import React, { useEffect, useState } from 'react';

const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get("http://localhost:5000/api/users/orders", { withCredentials: true });
                setOrders(response.data);
            } catch (err) {
                if (err.response.status === 401) {
                    setError("You are not logged in. Please log in to view your orders.");
                }
                else {
                    setError(err.response?.data?.message || "Failed to fetch orders");
                }
            }
        };

        fetchOrders();
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-6">
            <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">Order History</h1>
            {error ? (
                <p className="text-center text-red-500 font-semibold">{error}</p>
            ) : orders.length === 0 ? (
                <p className="text-center text-gray-600">No orders found.</p>
            ) : (
                <div className="space-y-6">
                    {orders.map(order => (
                        <div
                            key={order.orderId}
                            className="bg-white shadow-lg rounded-lg p-6 border border-gray-200"
                        >
                            <h2 className="text-xl font-semibold text-gray-800">Order ID: {order.orderId}</h2>
                            <p className="text-gray-600">Order Status: <span className="font-medium">{order.orderStatus}</span></p>
                            <p className="text-gray-600">Payment Status: <span className="font-medium">{order.paymentStatus}</span></p>
                            <p className="text-gray-600">Total Amount: <span className="font-medium">${order.totalAmount}</span></p>
                            <h3 className="text-lg font-semibold text-gray-700 mt-4">Products:</h3>
                            <div className="mt-2 space-y-4">
                                {order.products.map(product => (
                                    <div
                                        key={product.title}
                                        className="flex items-center gap-4 p-4 border rounded-lg bg-gray-50"
                                    >
                                        {/* Uncomment below if image URLs are functional */}
                                        <img
                                            src={product.image}
                                            alt={product.title}
                                            className="w-16 h-16 rounded object-cover"
                                        />
                                        <div>
                                            <p className="text-gray-800 font-medium">{product.title}</p>
                                            <p className="text-sm text-gray-500">{product.description}</p>
                                            <p className="text-sm text-gray-500">
                                                Quantity: <span className="font-medium">{product.quantity}</span>
                                            </p>
                                            <p className="text-sm text-gray-500">
                                                Price: <span className="font-medium">${product.price}</span>
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Orders;
