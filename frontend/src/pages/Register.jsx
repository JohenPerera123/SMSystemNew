import React,{useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'


const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('null')
    const navigate = useNavigate()

    const handleSubmit = async(e) => {
        e.preventDefault();
        if(password !== confirmPassword){
            setError("Passwords do not match");
            return;
        }
        try {
            const response = await axios.post("http://localhost:5000/api/auth/register",
                {username, email, password}
            );
            if(response.data.success){
                navigate("/login")
            }
        }
        catch (error) {
            if(error.response && !error.response.data.success){
                setError(error.response.data.error)
            } else {
                setError("Registration Server Error");
            }
        }
    }


return (
        <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-b from-teal-600 
        from-50% to-gray-100 to-50% space-y-6">
            <h2 className='font-sevillana text-3xl text-white'>Stadium Management System</h2>
            <div className='border shadow p-6 w-80 bg-white'>
                <h2 className='text-2xl font-bold'>Register</h2>
                {error && <p className='text-red-500'>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Username:</label>
                        <input type="text" className="w-full py-2 px-3 border"
                            placeholder='Enter Username'
                            onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Email:</label>
                        <input type="email" className="w-full py-2 px-3 border"
                            placeholder='Enter Email'
                            onChange={(e) => setEmail(e.target.value)} required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Password:</label>
                        <input type="password" className="w-full py-2 px-3 border"
                            placeholder='Enter Password'
                            onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    <div className='mb-4'>
                        <label className='block text-gray-700'>Confirm Password:</label>
                        <input type="password" className="w-full py-2 px-3 border"
                            placeholder='Confirm Password'
                            onChange={(e) => setConfirmPassword(e.target.value)} required />
                    </div>
                    <div className='mb-4'>
                        <button type='submit' className='w-full bg-teal-600 text-white py-2'>Register</button>
                    </div>
                </form>
                <p className='text-sm'>Already have an account? <Link to="/login" className='text-teal-600'>Login</Link></p>
            </div>
        </div>
    );
};

export default Register;
