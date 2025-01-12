// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';
// import { toast } from 'react-hot-toast';

// function ResetPassword() {
//     const { token } = useParams();  // Get the token from the URL
//     const [password, setPassword] = useState('');
//     const [loading, setLoading] = useState(false);
//     const navigate = useNavigate();



//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);
//         try {
//             await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, { password });
//             toast.success('Password reset successfully');
//             navigate('/login');
//         } catch (error) {
//             toast.error('Error resetting password');
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="flex justify-center items-center h-screen bg-gray-100">
//             <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
//                 <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-4">
//                         <label className="block text-gray-700">New Password</label>
//                         <input
//                             type="password"
//                             name="password"
//                             value={password}
//                             onChange={(e) => setPassword(e.target.value)}
//                             className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
//                             required
//                         />
//                     </div>

//                     <button
//                         type="submit"
//                         className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
//                         disabled={loading}
//                     >
//                         {loading ? 'Resetting...' : 'Reset Password'}
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }

// export default ResetPassword;


import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

function ResetPassword() {
    const { token } = useParams();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [passwordError, setPasswordError] = useState('');
    const navigate = useNavigate();


    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;


    const validatePassword = (password) => {
        if (!passwordRegex.test(password)) {
            setPasswordError(
                'Password must be at least 8 characters long, and include at least one uppercase letter, one lowercase letter, one number, and one special character (!@#$%^&*).'
            );
            return false;
        }
        if (password !== confirmPassword) {
            setPasswordError("Passwords don't match.");
            return false;
        }
        setPasswordError('');
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validatePassword(password)) {
            return;
        }

        setLoading(true);
        try {
            await axios.post(`http://localhost:5000/api/users/reset-password/${token}`, { password });
            toast.success('Password reset successfully');
            navigate('/login');
        } catch (error) {
            toast.error('Error resetting password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">New Password</label>
                        <input
                            type="password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>

                    {passwordError && <p className="text-red-500 text-center mb-4">{passwordError}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? 'Resetting...' : 'Reset Password'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default ResetPassword;
