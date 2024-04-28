// DetailsPage.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const DetailsPage = () => {
  const { id } = useParams();
  const [details, setDetails] = useState(null);
  const [asset, setAsset] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
          const response = await axios.get(`https://images-api.nasa.gov/search?nasa_id=${id}`);
          const item = response.data.collection.items[0];
          const href = await axios.get(item.href);
          setDetails(item);
          setAsset(href);
      } catch (error) {
        console.error('Error fetching details:', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <div>
      <h1>Details Page</h1>
      {details && (
          <div>
           <h2>{details.data[0].title}</h2>
           {details.links ? <img src={asset.data[0]} alt={details.data[0].title} /> : <audio src={asset.data[0]} controls/> }
           <p>{details.data[0].description}</p> 
        </div>
      )}
    </div>
  );
};

export default DetailsPage;
