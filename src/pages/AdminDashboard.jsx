// import React from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';

// function AdminDashboard() {
//     const navigate = useNavigate();
//     const role = localStorage.getItem('role');  // Retrieve the role from local storage

//     // Only show the dashboard if the user is an admin
//     if (role !== 'admin') {
//         navigate('/');  // Redirect non-admin users to the homepage
//         return null;
//     }

//     // Handle Logout
//     const handleLogout = () => {
//         localStorage.removeItem('token');
//         localStorage.removeItem('email');
//         localStorage.removeItem('role');
//         localStorage.setItem('isLoggedIn', 'false');
//         document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
//         navigate('/');  // Redirect to login page after logout
//     };

//     return (
//         <div>
//             {/* Navbar */}
//             <nav className="flex justify-between items-center h-16 bg-gray-800 text-white px-10">
//                 <div className="flex space-x-6">
//                     <NavLink to="/admin/products" className="hover:text-yellow-500 transition">
//                         Products
//                     </NavLink>
//                     <NavLink to="/admin-dashboard" className="hover:text-yellow-500 transition">
//                         Dashboard
//                     </NavLink>
//                 </div>
//                 <button
//                     onClick={handleLogout}
//                     className="bg-red-600 px-4 py-2 rounded-lg hover:bg-red-700 transition"
//                 >
//                     Logout
//                 </button>
//             </nav>

//             {/* Admin Dashboard Content */}
//             <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
//                 <h1 className="text-3xl font-bold mb-6">Admin Portal</h1>
//                 <button
//                     onClick={() => navigate('/add-product')}  // Navigate to add product page
//                     className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
//                 >
//                     Add Product
//                 </button>
//             </div>
//         </div>
//     );
// }

// export default AdminDashboard;


import React from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';

function AdminDashboard() {
    const navigate = useNavigate();
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

    return (
        <div>
            {/* Admin Navbar */}
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

            {/* Admin Dashboard Content */}
            <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
                <h1 className="text-3xl font-bold mb-6">Admin Portal</h1>
                <button
                    onClick={() => navigate('/add-product')}  
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                >
                    Add Product
                </button>
            </div>
        </div>
    );
}

export default AdminDashboard;
