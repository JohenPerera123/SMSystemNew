import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EditResource = () => {
  const { id } = useParams();
  const [resource, setResource] = useState({});
  const [stadiums, setStadiums] = useState([]);
  const [photo, setPhoto] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch resource by ID
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');

        const [resourceRes, stadiumsRes] = await Promise.all([
          axios.get(`http://localhost:5000/api/resources/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get('http://localhost:5000/api/stadiums', {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);

        if (resourceRes.data.success) setResource(resourceRes.data.resource);
        if (stadiumsRes.data.success) setStadiums(stadiumsRes.data.stadiums);
      } catch (err) {
        alert('Failed to load resource or stadiums');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setResource(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append('stadiumId', resource.stadium?._id || resource.stadium); // ID from object or string
    formData.append('resources', resource.resources);
    if (photo) {
      formData.append('photo', photo);
    }

    try {
      const token = localStorage.getItem('token');
      const res = await axios.put(`http://localhost:5000/api/resources/${id}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      if (res.data.success) {
        navigate('/admin-dashboard/resources');
      }
    } catch (error) {
      alert('Failed to update resource');
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 rounded-md shadow-md w-96">
      <h3 className="text-2xl font-bold mb-6">Edit Resource</h3>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        {/* Stadium Selection */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Stadium</label>
          <select
            name="stadium"
            value={resource.stadium?._id || resource.stadium || ''}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select Stadium</option>
            {stadiums.map(stadium => (
              <option key={stadium._id} value={stadium._id}>
                {stadium.Std_name}
              </option>
            ))}
          </select>
        </div>

        {/* Resource Field */}
        <div className="mb-4">
          <label htmlFor="resources" className="text-sm font-medium text-gray-700">
            Resources
          </label>
          <textarea
            name="resources"
            value={resource.resources || ''}
            onChange={handleChange}
            className="mt-1 w-full p-2 border border-gray-300 rounded-md"
          />
        </div>

        {/* Photo Upload */}
        <div className="mb-4">
          <label className="block mb-1 font-medium">Upload New Photo:</label>
          <input
            type="file"
            name="photo"
            onChange={(e) => setPhoto(e.target.files[0])}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Current Photo Preview */}
        {resource.photo && (
          <img
            src={`http://localhost:5000/uploads/resources/${resource.photo}`}
            alt="Current"
            className="w-full h-32 object-cover rounded mb-3"
          />
        )}

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-4 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Resource
        </button>
      </form>
    </div>
  );
};

export default EditResource;
