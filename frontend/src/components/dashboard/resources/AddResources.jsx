import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddResource = () => {
  const [stadiums, setStadiums] = useState([]);
  const [resourceName, setResourceName] = useState('');
  const [stadiumId, setStadiumId] = useState('');
  const [loading, setLoading] = useState(false);
  const [photo, setPhoto] = useState(null);
  const navigate = useNavigate();

  // Fetch stadium list
  useEffect(() => {
    const fetchStadiums = async () => {
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/stadiums', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (res.data.success) {
          setStadiums(res.data.stadiums);
        }
      } catch (error) {
        alert('Error fetching stadiums');
      }
    };

    fetchStadiums();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!resourceName || !stadiumId || !photo) {
      alert('Please fill all fields and uplod a photo');
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      const formData =new FormData();
      formData.append('resources', resourceName);
      formData.append('stadiumId',stadiumId);
      formData.append('photo', photo);

      const res = await axios.post(
        'http://localhost:5000/api/resources/add-resource',
        formData,
        // {
        //   resources: resourceName,
        //   stadiumId,
        // },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type':'multipart/form-data',
          },
        }
      );
      if (res.data.success) {
        alert('Resource added successfully!');
        navigate('/admin-dashboard/resources');
      }
    } catch (error) {
      alert('Error adding resource');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h2 className="text-xl font-semibold mb-4 text-center">Add New Resource</h2>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white shadow-md rounded-md p-5">
        <div>
          <label className="block mb-1 font-medium">Resource Name:</label>
          <input
            type="text"
            value={resourceName}
            onChange={(e) => setResourceName(e.target.value)}
            className="w-full border px-3 py-1 rounded"
            placeholder="e.g. LED Screens, Speakers"
          />
        </div>

        <div>
          <label className="block mb-1 font-medium">Select Stadium:</label>
          <select
            value={stadiumId}
            onChange={(e) => setStadiumId(e.target.value)}
            className="w-full border px-3 py-1 rounded"
          >
            <option value="">-- Choose Stadium --</option>
            {stadiums.map((std) => (
              <option key={std._id} value={std._id}>
                {std.Std_name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 font-medium">Upload Photo:</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full"
          />
        </div>


        <div className="text-right">
          <button
            type="submit"
            disabled={loading}
            className="bg-teal-600 text-white px-4 py-1 rounded hover:bg-teal-700"
          >
            {loading ? 'Adding...' : 'Add Resource'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddResource;