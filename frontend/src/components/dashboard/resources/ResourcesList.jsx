import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const ResourceCard = ({ resource, onDelete }) => {
  const navigate = useNavigate();

  const handleDelete = async () => {
  const confirmDelete = window.confirm('Are you sure you want to delete this resource?');
  if (!confirmDelete) return;

  try {
    const token = localStorage.getItem('token');
    await axios.delete(`http://localhost:5000/api/resources/${resource._id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    onDelete(resource._id);
  } catch (error) {
    alert('Failed to delete resource');
  }
};


  const handleUpdate = () => {
    navigate(`/admin-dashboard/update-resource/${resource._id}`);
  };

  return (
    <div className="bg-white shadow-md rounded-md p-4 border hover:shadow-lg transition-all">
      <h3 className="text-lg font-semibold mb-1">
        Stadium: {resource.stadium?.Std_name}
      </h3>
      <h3 className="text-sm text-gray-600 mb-2">Resources: {resource.resources}</h3>

      <div className="flex gap-2">
        <button
          onClick={handleUpdate}
          className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
        >
          Update
        </button>

        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

const ResourceList = () => {
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
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          placeholder="Search by Stadium or Resource"
          onChange={handleSearch}
          className="border px-4 py-1 rounded w-64"
        />
        <Link
          to="/admin-dashboard/add-resources"
          className="bg-teal-600 text-white px-4 py-1 rounded hover:bg-teal-700"
        >
          Add New Resource
        </Link>
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

export default ResourceList;
