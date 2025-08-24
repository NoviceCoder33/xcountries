import React, { useEffect, useState } from 'react';
import axios from "axios";

export default function Countries() {
    const [countries, setCountries] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    // Example with fetch (keeping your commented code here)
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

    // Using axios for API call
    useEffect(() => {
        const getData = async () => {
            try {
                const res = await axios.get(
                  'https://countries-search-data-prod-812920491762.asia-south1.run.app/countries'
                );
                console.log("API Data:", res.data);
                setCountries(Array.isArray(res.data) ? res.data : []);
            } catch (error) {
                console.error('Error fetching data:', error);
                setError(error);
            } finally {
                setLoading(false);
            }
        };
        getData();
    }, []);

    // Filter countries by searchTerm
    const filteredCountries = countries.filter(country =>
        country.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div style={{ padding: "20px" }}>
            {/* Search input */}
            <input
                type="text"
                placeholder="Search countries..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                    marginBottom: '20px',
                    padding: '8px',
                    width: '300px',
                    fontSize: '16px',
                    borderRadius: '4px',
                    border: '1px solid #ccc'
                }}
            />

            {/* Show error if any */}
            {error && <p>Error: {error.message}</p>}

            {/* Show loading */}
            {loading && <p>Loading...</p>}

            {/* Countries grid */}
            <div style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "16px",
                justifyContent: "flex-start"
            }}>
                {!loading && filteredCountries.length > 0 && filteredCountries.map((country, index) => (
                    <div
                        key={index}
                        className="countryCard"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            border: "1px solid lightgrey",
                            borderRadius: "4px",
                            padding: "10px",
                            width: "220px",
                            backgroundColor: "#fafafa"
                        }}
                    >
                        <img
                            src={country.png}
                            alt={country.common}
                            style={{ width: "200px", height: "auto", objectFit: "contain" }}
                        />
                        <p style={{ margin: "8px 0 0", fontWeight: "500" }}>{country.common}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
