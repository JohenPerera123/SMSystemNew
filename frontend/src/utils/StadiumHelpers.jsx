import { useNavigate } from "react-router-dom"
import axios from "axios"

export const columns =[
    {
        name: 'S.No',
        selector: row => row.sno,
    },
    {
        name:'Stadium Name',
        selector: row =>row.std_name,
    },
    {
        name: 'Location',
        selector: row => row.Std_location,
    },
    {
        name:"Action",
        selector: row => row.action,
    }
    
]

export const StadiumButtons = ({_id, onStadiumDelete})=> {
    const navigate = useNavigate()
    const handleDelete = async(id) => {
        const confirmDelete = window.confirm("Are you want to delet?")
        if (confirmDelete){
        try {
        const response = await axios.delete(
            `http://localhost:5000/api/stadiums/${id}`,

             {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        if(response.data.success) {
            onStadiumDelete(id)        
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
          alert(error.response.data.error);
        }
      }
    }
    };
    return(
        <div className="flex gap-2">
            <button className="px-3 py-1 text-white bg-green-600 rounded hover:bg-green-700"
            onClick={() => navigate(`/admin-dashboard/stadium/${_id}`)}>Edit</button>
            <button className="px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
            onClick={() =>handleDelete(_id)}>Delete</button>
        </div>
    )
}

