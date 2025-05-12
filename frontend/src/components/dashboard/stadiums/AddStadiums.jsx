import React from 'react'
import { Link } from 'react-router-dom'

const AddStadiums = () => {
  const [stadium, setStadium] = useState({
      Std_name: '',
      Std_location: '',
      Std_capacity: '',
      resourceres: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStadium({ ...stadium, [name]: value });

    };

    const handleSubmit = async(e) => {
        e.preventDefalt();
        try {
            const response = await axios.post('http://localhost:5000/api/stadiums/add', stadium, {
                headers: {
        "Authorization": `Bearer ${localStorage.getItem('token')}`
    }
});
            if (response.data.success){
                navigate('/admin-dashboard/stadiums');
            }
        } catch (error) {
            if(error.response && !error.response.data.success){
                alert(error.response.data.error);
            }
        }
    }

  return (
    <div>
        <div className='max-w-3xl mx-auto mt-10 p-8 rounded-md shadow-md w-96'>
            <h3 className='text-2x1 font-bold mb-6'>Add Stadium</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Std_name"
                    className='text-sm font-medium text-gray-700'>Stadium Name</label>
                    <input type="text" placeholder='Enter Satadium name'
                    onChange={handleChange}
                    className='mt-1 w-full p-2 border border-gray-300 rounded-md'/>

                </div>
                <div>
                    <label htmlFor="Std_location"
                    className='text-sm font-medium text-gray-700'>Location</label>
                    <input type="text" placeholder='Location'
                    onChange={handleChange}
                    className='mt-1 w-full p-2 border border-gray-300 rounded-md'/>

                </div>
                <div>
                    <label htmlFor="Std_capacity"
                    className='text-sm font-medium text-gray-700'>Capacity</label>
                    <input type="number" placeholder='Capacity'
                    onChange={handleChange}
                    className='mt-1 w-full p-2 border border-gray-300 rounded-md'/>

                </div>
                <div className='mt-3'>
                    <label htmlFor="resourceres">Resourceres</label>
                    <textarea name="resourceres" placeholder='Resourceres'
                    onChange={handleChange}
                    className='mt-1 p-2 block w-full border-gray-300 rounded-md '></textarea>

                </div>
                <div>
                    <button type='submit'
                    className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4'>Add Stadium</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default AddStadiums