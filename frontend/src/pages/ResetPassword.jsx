import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();


  const handleReset = async (e) => {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords don't match");
      return;
    }

    try {
      const token = localStorage.getItem('resetToken');
      const res = await axios.post('http://localhost:5000/api/auth/reset-password', {
        token,
        newPassword: password,
      });
      if (res.data.success) {
        setMessage('Password has been reset successfully.');
        localStorage.removeItem('resetToken');
        localStorage.removeItem('resetEmail');
          alert("Password changed successfully!");
        setTimeout(() => (window.location.href = '/login'), 2000);
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Something went wrong');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("resetToken");
    const verified = localStorage.getItem("otpVerified");
    if (!token || !verified) {
      navigate('/login'); 
    }
  }, [navigate]);


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-teal-600 
    from-50% to-gray-100 to-50% space-y-6">
    <div className='border shadow p-6 w-80 bg-white'>
      <h2 className="text-xl font-bold mb-4">Reset Password</h2>
      {message && <p className="text-green-600">{message}</p>}
      {error && <p className="text-red-600">{error}</p>}
      <form onSubmit={handleReset}>
        <input
          type="password"
          placeholder="New Password"
          className="border p-2 w-full mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          className="border p-2 w-full mb-3"
          value={confirm}
          onChange={(e) => setConfirm(e.target.value)}
          required
        />
        <button className="bg-teal-600 text-white px-4 py-2 w-full">Reset Password</button>
      </form>
      </div>
    </div>
  );
};

export default ResetPassword;
