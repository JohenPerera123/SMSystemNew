import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UCrm = () => {
  const [comment, setComment] = useState('');
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);
  const [comments, setComments] = useState([]);
  const [editing, setEditing] = useState(null);

  useEffect(() => {
  const stored = JSON.parse(localStorage.getItem('user'));
  if (stored && stored._id) {
    setUser(stored);
    fetchUserComments(stored._id);
  } else {
    setMessage('User not logged in.');
  }
}, []);


  const fetchUserComments = async (userId) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/crm/user/${userId}`);
    setComments(res.data);
  } catch {
    setMessage('Failed to load your comments.');
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) return setMessage('Comment required.');

    try {
      if (editing) {
        await axios.put(`http://localhost:5000/api/crm/update/${editing}`, {
          userId: user._id,
          comment,
        });
        setMessage('Comment updated.');
      } else {
        await axios.post('http://localhost:5000/api/crm/add', {
          userId: user._id,
          comment,
        });
        setMessage('Comment submitted.');
      }
      setComment('');
      setEditing(null);
      fetchUserComments(user._id);
    } catch (err) {
      setMessage(err.response?.data?.error || 'Failed.');
    }
  };

  const handleEdit = (c) => {
    setComment(c.comment);
    setEditing(c._id);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/crm/delete/${id}`, {
        data: { userId: user._id },
      });
      setMessage('Comment deleted.');
      fetchUserComments(user._id);
    } catch {
      setMessage('Delete failed.');
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Your Comments</h2>
      <form onSubmit={handleSubmit} className="space-y-2">
        <textarea
          className="w-full border rounded p-2"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows="4"
          placeholder="Enter comment"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded" type="submit">
          {editing ? 'Update' : 'Submit'}
        </button>
      </form>
      {message && <p className="mt-2 text-sm text-red-500">{message}</p>}
      <div className="mt-4 space-y-3">
        {comments.map((c) => (
          <div key={c._id} className="border p-3 rounded bg-gray-50">
            <p>{c.comment}</p>
            <div className="text-right space-x-2 mt-2">
              <button onClick={() => handleEdit(c)} className="text-blue-500">Edit</button>
              <button onClick={() => handleDelete(c._id)} className="text-red-500">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UCrm;
