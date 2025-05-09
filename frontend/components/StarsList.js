import React, { useState, useEffect } from 'react'
import {useNavigate, usseNavigate} from 'react-router-dom'
import axios from 'axios'

export default function StarsList() {
  const navigate = useNavigate()
  const [stars, setStars] = useState([])
  const logout = () => {
    // wipe out the token from local storage 
    localStorage.removeItem('token')
    //redirecting the user to login
    navigate('/')
  }
  useEffect(() => {
    // grab token form local storage 
  const token = localStorage.getItem('token')
  // if not there. navigate user back to login
 if (!token) { navigate('/')
  } else {
const fetchStars =async () => {
  try {
    const response = await axios.get(
      '/api/stars',
      {headers: {Authorization: token}}
  )
  setStars(response.data)
} catch (error){
  if (error?.response?.status==401) {
logout()
  }
}
  //Get stars, appeding token to Authorization header
  // if response if a 401 Unauthorized perform a logout 
// if response is OK set the  stars in compoinet state 
}
fetchStars()
}
  },[])
  return (
    <div className="container">
      <h3>StarsList <button>Logout</button></h3>
      {stars.length > 0 ? (
        <div>
          {stars.map((star) => (
            <div key={star.id} style={{ marginBottom: '20px' }} className="star">
              <h4>{star.fullName}</h4>
              <p>Born: {star.born}</p>
              <p>{star.bio}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No stars found.</p>
      )}
    </div>
  )
}
