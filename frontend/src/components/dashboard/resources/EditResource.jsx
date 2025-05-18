import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'

const EditResource = () => {
  const { id } = useParams()
  const [resource, setResource] = useState({})
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

    const [stadiums, setStadiums] = useState([])

  useEffect(() => {
    const fetchResource = async () => {
      setLoading(true)
      try {
        const res = await axios.get(`http://localhost:5000/api/resources/${id}`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        })
        if (res.data.success) {
          setResource(res.data.resource)
        }
      } catch (error) {
        alert('Failed to fetch resource')
      } finally {
        setLoading(false)
      }
    }
    fetchResource()
  }, [id]
)

  const handleChange = (e) => {
    const { name, value } = e.target
    setResource(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await axios.put(`http://localhost:5000/api/resources/${id}`, resource, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      if (res.data.success) {
        navigate('/admin-dashboard/resources')
      }
    } catch (error) {
      alert('Failed to update resource')
    }
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className="max-w-3xl mx-auto mt-10 p-8 rounded-md shadow-md w-96">
      <h3 className="text-2xl font-bold mb-6">Edit Resource</h3>
      <form onSubmit={handleSubmit}>
        
        <div>
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
        <div className="mt-3">
          <button
            type="submit"
            className="w-full mt-6 bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4"
          >
            Update Resource
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditResource
