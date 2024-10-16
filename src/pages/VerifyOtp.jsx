import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function VerifyOtp() {
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setOtp(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccess('');
        setLoading(true);

        try {
            const userData = JSON.parse(localStorage.getItem('userData'));
            console.log("User data:", userData);
            if (!userData) {
                setError('No user data found. Please register again.');
                setLoading(false);
                return;
            }

            const { email, password, name, isAdmin } = userData;
            const role = isAdmin ? 'admin' : 'user';
            const response = await axios.post('http://localhost:5000/api/users/verify-otp', {
                email,
                otp,
                password,
                name,
                isAdmin,
                role
            });

            if (response.status === 200) {
                setSuccess('OTP verified successfully! User registered.');
                localStorage.removeItem('userData');
                setTimeout(() => {
                    navigate('/login'); 
                }, 2000); 
            } else {
                setError('Invalid OTP or request failed');
            }
        } catch (error) {
            if (error.response && error.response.data.message === 'OTP has expired') {
                setError('Your OTP has expired. Please request a new OTP.');
                
                setTimeout(() => {
                    navigate('/signup`'); 
                }, 2000); 
            } else {
                setError('Failed to verify OTP. Please try again.');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Verify OTP</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Enter OTP</label>
                        <input
                            type="text"
                            name="otp"
                            value={otp}
                            onChange={handleChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring focus:border-blue-300"
                            required
                        />
                    </div>

                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    {success && <p className="text-green-500 text-center mb-4">{success}</p>}

                    <button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? 'Verifying OTP...' : 'Verify OTP'}
                    </button>
                </form>
            </div>
        </div>
    );
}

export default VerifyOtp;
