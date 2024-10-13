import React from 'react';
import { useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const navigate = useNavigate();
    const role = localStorage.getItem('role');  // Retrieve the role from local storage

    // Only show the button if the user is an admin
    if (role !== 'admin') {
        navigate('/');  // Redirect non-admin users to the homepage or another page
        return null;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">Admin Portal</h1>
            <button
                onClick={() => navigate('/add-product')}  // Navigate to add product page
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
            >
                Add Product
            </button>
        </div>
    );
}

export default AdminDashboard;
