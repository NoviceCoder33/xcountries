import React, { useEffect, useState } from 'react'
import axios from "axios";

export default function Countries() {
    const [countries, setCountries] = useState([]);
    const [error, setError] = useState(null);
     
    // useEffect(() => {
    //     fetch('https://xcountries-backend.azurewebsites.net/all')
    //       .then((res) => {
    //         if (!res.ok) throw new Error(`HTTP status ${res.status}`);
    //         return res.json();
    //       })
    //       .then((data) => setCountries(data))
    //       .catch((err) => {
    //         console.error('Error fetching data:', err.message);
    //         setError(err.message);
    //       });
    //   }, []);
     useEffect(()=>{
      const getData=async()=>{
        try {
          const res = await axios.get('https://xcountries-backend.azurewebsites.net/all')
          console.log(res.data);
          setCountries(res.data);
          
        } catch (error) {
          setError(error);
        }
      };
      getData();
     },[]);
    
    
     if (error) return <p>Error: {error.message}</p>;
     if (countries.length === 0) return <p>Loading...</p>;

  return (
    <div>
      <div style={{display:"flex",flexDirection:"row",gap:5,flexWrap:"wrap"}}>
      {countries.map((country, index) => (
        <div style={{display:"flex",flexDirection:"column",gap:5, border:"1px solid lightgrey",borderRadius:"2px", alignItems:"center", justifyContent:"center"}}>
        <img key={index} src={country.flag} alt={country.name} style={{ width: 200, height: 'auto' }} />
        <p>{country.name}</p>
        </div>
      ))}
    </div>
    </div>
  )
}
