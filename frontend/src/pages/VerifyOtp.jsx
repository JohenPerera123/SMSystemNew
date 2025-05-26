import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const VerifyOtp = () => {
  const [otp, setOtp] = useState('');
  const [error, setError] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
    const email = localStorage.getItem("resetEmail");
    if (!email) {
      navigate('/login');
    }
        }, [navigate]);

  const handleVerify = async (e) => {
    e.preventDefault();
    const email = localStorage.getItem('resetEmail');
    try {
      const res = await axios.post('http://localhost:5000/api/auth/verify-otp', { email, otp });
      if (res.data.success) {
        localStorage.setItem('resetToken', res.data.token);
        localStorage.setItem('otpVerified', 'true');
        window.location.href = '/reset-password';
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Invalid OTP');
    }
  };



  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-teal-600 
    from-50% to-gray-100 to-50% space-y-6">
    <div className='border shadow p-6 w-80 bg-white'>
      <h2 className="text-xl font-bold mb-4">Verify OTP</h2>
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleVerify}>
        <input
          type="text"
          placeholder="Enter OTP"
          className="border p-2 w-full mb-3"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          required
        />
        <button className="bg-teal-600 text-white px-4 py-2 w-full">Verify OTP</button>
      </form>
      </div>
    </div>
  );
};

export default VerifyOtp;
