// SearchPage.js
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [mediaTypes, setMediaTypes] = useState({
    image: true,
    audio: false,
  });
  const [results, setResults] = useState([]);

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setMediaTypes({ ...mediaTypes, [name]: checked });
  };

  const handleSearch = async () => {
    try {
      const mediaTypeQuery = Object.keys(mediaTypes)
        .filter((type) => mediaTypes[type])
        .map((type) => `${type}`)
        .join(",");
      const response = await axios.get(
        `https://images-api.nasa.gov/search?q=${query}&media_type=${mediaTypeQuery}`
      );
      setResults(response.data.collection.items);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const chunkArray = (array, size) => {
    return array.reduce((acc, _, index) => {
      if (index % size === 0) {
        acc.push(array.slice(index, index + size));
      }
      return acc;
    }, []);
  };

  return (
    <div>
      <h1>Search Page</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <div>
        <label>
          Images
          <input
            type="checkbox"
            name="image"
            checked={mediaTypes.image}
            onChange={handleCheckboxChange}
          />
        </label>
        <label>
          Audio
          <input
            type="checkbox"
            name="audio"
            checked={mediaTypes.audio}
            onChange={handleCheckboxChange}
          />
        </label>
      </div>
      <button onClick={handleSearch}>Search</button>
      <div class="container">
        {chunkArray(results, 3).map((row, rowIndex) => (
          <div className="row " key={rowIndex}>
            {row.map((item, index) => (
              <div className="col bg-secondary m-2" key={index}>
                <Link
                  key={item.data[0]?.nasa_id}
                  to={`/details/${item.data[0]?.nasa_id}`}
                >
                  {/* actual image */}
                  {item.links && item.links[0] && item.links[0].href && (
                    <img src={item.links[0].href} alt={item.data[0]?.title} />
                  )}

                  {/* image description text */}
                  {item.data[0]?.description && <p>{item.data[0].title}</p>}
                </Link>
              </div>
            ))}
          </div>
        ))}{" "}
      </div>

      {/*<div className="grid">
        {results.map((item) => (
          <Link
            key={item.data[0]?.nasa_id}
            to={`/details/${item.data[0]?.nasa_id}`}
          >
            {/* actual image /}
            {item.links && item.links[0] && item.links[0].href && (
              <img src={item.links[0].href} alt={item.data[0]?.title} />
            )}

            {/* image description text /}
            {item.data[0]?.description && <p>{item.data[0].title }</p>}
          </Link>
        ))}
      </div>*/}
    </div>
  );
};

export default SearchPage;
