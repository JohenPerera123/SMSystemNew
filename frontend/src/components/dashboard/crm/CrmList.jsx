import React, { useEffect, useState } from 'react';
import axios from 'axios';

const CrmList = () => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/crm/all');
        const data = response.data;

        if (Array.isArray(data)) {
          setComments(data);
        } else {
          console.error("Expected array but got:", data);
          setComments([]);
        }
      } catch (error) {
        console.error('Failed to fetch comments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchComments();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">All User Comments</h2>
      {loading ? (
        <p>Loading comments...</p>
      ) : comments.length === 0 ? (
        <p>No comments found.</p>
      ) : (
        <div className="space-y-4">
          {comments.map(comment => (
            <div key={comment._id} className="bg-white shadow-md p-4 rounded-md">
              <p className="text-gray-800 font-medium">{comment.comment}</p>
              <p className="text-xs text-gray-400 mt-1">
                Submitted on {new Date(comment.submittedAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CrmList;