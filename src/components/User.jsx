import React, { useState, useEffect } from 'react';
import axios from "../api/axios";
import useAuthContext from '../context/AuthContext';

const User = () => {

  const { user, getUser } = useAuthContext();



  return (

    <div className="container mx-auto p-4">
      <button onClick={console.log(user)}>view</button>

      <div>
        <h1>Favorite sources:</h1>
      </div>
    </div>
  
  )
}

export default User