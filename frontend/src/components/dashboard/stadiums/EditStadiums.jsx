import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const EditStadiums = () => {
    const {id} = useParams()
    const [stadium, setStadium] = useState([])
    const [stdLoading, setStdLoading] = useState(false)
    const navigate = useNavigate()

      useEffect(() => {
    const fetchStadiums = async () => {
      setStdLoading(true)
      try {
        const response = await axios.get(
            `http://localhost:5000/api/stadiums/${id}`,
             {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        if(response.data.success) {
          setStadium(response.data.stadium);
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
          alert(error.response.data.error);
        }
      }finally{
        setStdLoading(false)
      }
    };

    fetchStadiums();
  }, [])

   const handleChange = (e) => {
    const { name, value } = e.target;
    setStadium({ ...stadium, [name]: value });

    }

    const handleSubmit = async(e) => {
              e.preventDefault();
                try {
                    const response = await axios.put(`http://localhost:5000/api/stadiums/${id}`, stadium, {
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
            <h3 className='text-2x1 font-bold mb-6'>Edit Stadium</h3>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="Std_name"
                    className='text-sm font-medium text-gray-700'>Stadium Name</label>
                    <input type="text" placeholder='Enter Satadium name' name='Std_name'
                    value={stadium.std_name}
                    onChange={handleChange}
                    className='mt-1 w-full p-2 border border-gray-300 rounded-md'/>

                </div>
                <div>
                    <label htmlFor="Std_location"
                    className='text-sm font-medium text-gray-700'>Location</label>
                    <input type="text" placeholder='Location' name='Std_location'
                    value={stadium.std_location}
                    onChange={handleChange}
                    className='mt-1 w-full p-2 border border-gray-300 rounded-md'/>

                </div>
                <div>
                    <label htmlFor="Std_capacity"
                    className='text-sm font-medium text-gray-700'>Capacity</label>
                    <input type="number" placeholder='Capacity' name='Std_capacity'
                    value={stadium.std_capacity}
                    onChange={handleChange}
                    className='mt-1 w-full p-2 border border-gray-300 rounded-md'/>

                </div>
                <div className='mt-3'>
                    <label htmlFor="resourceres">Resourceres</label>
                    <textarea name="resourceres" placeholder='Resourceres'
                    value={stadium.std_resourceres}
                    onChange={handleChange}
                    className='mt-1 p-2 block w-full border-gray-300 rounded-md '></textarea>

                </div>
                <div>
                    <button type='submit'
                    className='w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4'>Edit Stadium</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EditStadiums