import axios from 'axios'
import React, {useState} from 'react'
import {useAuth} from '../context/authContext.jsx'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('null')
    const {login} = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async(e) => {

        e.preventDefault()
        try {
            const response = await axios.post("http://localhost:5000/api/auth/login",
                {email, password}
            );
            if(response.data.success){
                login(response.data.user)
                localStorage.setItem("token", response.data.token)
                localStorage.setItem("user", JSON.stringify(response.data.user));
                if(response.data.user.role === "admin"){
                    navigate("/admin-dashboard")
                }else {
                    navigate("/user-dashboard")
                }
            }
        }
        catch (error) {
            if(error.response && !error.response.data.success){
                setError(error.response.data.error)
            } else {
                setError("Server Error");
            }
        }
    };
    
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-teal-600 
    from-50% to-gray-100 to-50% space-y-6" >
        <h2 className='font-sevillana text-3xl text-white'>Stadium Management System</h2>
        <div className='border shadow p-6 w-80 bg-white'>
        <h2 className='text-2xl font-bold'>Login</h2>
        {error && <p className='text-red-500'>{error}</p>}
        <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                <label htmlFor="email" className='block text-gray-700'>Email:</label>
                <input 
                type="email"
                className="w-full py-2 px-3 boder" 
                placeholder='Enter Email'
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>
            <div className='mb-4'>
                <label htmlFor="password" className='block text-gray-700'>Password:</label>
                <input 
                type="password" 
                className="w-full py-2 px-3 boder"
                placeholder='Enter Password'
                onChange={(e) => setPassword(e.target.value)}
                required
                />
            </div>
            <div className='mb-4 flex items-center justify-between' >
                <label className="inline-flex items-center">
                    <input type="checkbox" className='form-checkbox' />
                    <span className='ml-2 text-gray-700'>Remember me</span>
                </label>
                <Link to="/register" className='text-teal-600'>Register Now</Link>
                
            </div>
            <div className='mb-4'>
                <button type='submit' className='w-full bg-teal-600 text-white py-2'>Login</button>
                <div className="flex flex-col text-right">
                    <Link to="/forgot-password" className='text-sm text-teal-600 hover:underline'>Forgot Password?</Link>
                </div>
                <Link to="/forgot-password" className='text-sm text-teal-600 hover:underline'>Forgot Password?</Link>
            </div>
        </form>
        </div>
    </div>
  )
}

export default Login