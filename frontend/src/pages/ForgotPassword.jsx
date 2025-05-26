import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/send-otp', { email });
      if (res.data.success) {
        localStorage.setItem('resetEmail', email);
        setMessage('OTP sent to your email.');
        window.location.href = '/verify-otp';
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Server Error');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-teal-600 
    from-50% to-gray-100 to-50% space-y-6">
        <div className='border shadow p-6 w-80 bg-white'>
      <h2 className="text-xl font-bold mb-4">Forgot Password</h2>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleSendOtp}>
        <input
          type="email"
          placeholder="Enter your email"
          className="border p-2 w-full mb-3"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className="bg-teal-600 text-white px-4 py-2 w-full">Send OTP</button>
      </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
