import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ResourceCard = ({ resource, }) => {

  const imageUrl = resource.photo
    ? `http://localhost:5000/uploads/resources/${resource.photo}`
    :null;

  return (
    <div className="bg-white shadow-md rounded-md p-4 border hover:shadow-lg transition-all">
      <h3 className="text-lg font-semibold mb-1">
        Stadium: {resource.stadium?.Std_name}
      </h3>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Resource"
          className="w-full h-40 object-cover rounded mb-3"
        />
      )}
      <h3 className="text-sm text-gray-600 mb-2">Resources: {resource.resources}</h3>
    </div>
  );
};

const UResourcesList = () => {
  const [resources, setResources] = useState([]);
  const [filtered, setFiltered] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleDelete = (id) => {
    setResources(prev => prev.filter(res => res._id !== id));
  };

  useEffect(() => {
    const fetchResources = async () => {
      setLoading(true);
      try {
        const token = localStorage.getItem('token');
        const res = await axios.get('http://localhost:5000/api/resources', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.data.success) {
          // Only keep resources where the stadium exists and has a name
          const validResources = res.data.resources.filter(
            r => r.stadium && r.stadium.Std_name
          );
          setResources(validResources);
        }
      } catch (error) {
        alert('Error fetching resources');
      } finally {
        setLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleSearch = (e) => {
  const keyword = e.target.value.toLowerCase();
  if (!keyword.trim()) {
    setFiltered(null);
    return;
  }

  const results = resources.filter(r =>
    (r.resources || '').toLowerCase().includes(keyword) ||
    (r.stadium?.Std_name || '').toLowerCase().includes(keyword)
  );
  setFiltered(results);
};


  const displayList = filtered || resources;

  return (

    <div className="p-6">
        <div className="text-center mb-6">
        <h3 className="text-2xl font-bold">Stadium Resources</h3>
      </div>
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Stadium or Resource"
          onChange={handleSearch}
          className="border px-4 py-1 rounded w-64"
        />
        
      </div>

      {loading ? (
        <p>Loading resources...</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {displayList.map((res) => (
            <ResourceCard key={res._id} resource={res} onDelete={handleDelete} />
          ))}
          {displayList.length === 0 && (
            <p className="text-gray-600 col-span-full text-center">No resources found.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default UResourcesList;
