// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// function Login() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();

//     // Handle form input change
//     const handleChange = (e) => {
//         const { name, value } = e.target;
//         if (name === 'email') setEmail(value);
//         if (name === 'password') setPassword(value);
//     };

//     // Handle form submission
//     // Handle form submission in the Login component
// const handleSubmit = async (e) => {
//     e.preventDefault();
//     setError('');
//     setLoading(true);

//     try {
//         const response = await axios.post('http://localhost:5000/api/users/login', {
//             email,
//             password
//         }, {
//             withCredentials: true // Include the cookie in the request
//         });

//         if (response.status === 200) {
//             localStorage.setItem('token', response.data.token);
//             localStorage.setItem('email', email);
//             localStorage.setItem('isLoggedIn', 'true');
//             window.dispatchEvent(new Event("storage"));
//             navigate('/dashboard');
//         } else {
//             setError('Invalid credentials');
//         }
//     } catch (err) {
//         setError(err.response?.data?.message || 'Error logging in. Please try again.');
//     } finally {
//         setLoading(false);
//     }
// };


//     return (
//         <div className="flex justify-center items-center h-screen bg-gray-100">
//             <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
//                 <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label className="block text-gray-700">Email</label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={email}
//                             onChange={handleChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//                             required
//                         />
//                     </div>

//                     <div className="mb-4">
//                         <label className="block text-gray-700">Password</label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={password}
//                             onChange={handleChange}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//                             required
//                         />
//                     </div>

//                     {error && <p className="text-red-500 text-center mb-4">{error}</p>}

//                     <button
//                         type="submit"
//                         className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//                         disabled={loading}
//                     >
//                         {loading ? 'Logging in...' : 'Login'}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default Login;


import React, { useState } from 'react';
import axios from 'axios';
import { Link, NavLink } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'email') setEmail(value);
        if (name === 'password') setPassword(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const response = await axios.post('http://localhost:5000/api/users/login', {
                email,
                password
            }, {
                withCredentials: true
            });

            if (response.status === 200) {
                const { token, role } = response.data;

                localStorage.setItem('token', token);
                localStorage.setItem('email', email);
                localStorage.setItem('role', role);  
                localStorage.setItem('isLoggedIn', 'true');
                window.dispatchEvent(new Event("storage"));


                if (role === 'admin') {
                    navigate('/admin-dashboard');
                } else {
                    navigate('/dashboard');
                }
            } else {
                setError('Invalid credentials');
            }
        } catch (err) {
            setError(err.response?.data?.message || 'Error logging in. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            name="email"
                            value={email}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>
                    <p className="text-blue-500 text-center mt-4">
                        <NavLink to="/forgot-password">Forgot Password?</NavLink>
                    </p>

                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;
