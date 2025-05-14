import axios from "axios";

 export const fetchStadiums = async () => {
    let stadiums  
    try {
        const response = await axios.get('http://localhost:5000/api/stadiums', {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem('token')}`
          }
        });
        if(response.data.success) {
            stadiums = response.data.stadiums
      
        }
      } catch (error) {
        if(error.response && !error.response.data.success){
          alert(error.response.data.error);
        }
      }
      return stadiums
    };




export const fetchEvents = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/events', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    return response.data.events;
  } catch (error) {
    console.error('Error fetching events:', error);
    return [];
  }
};