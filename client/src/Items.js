import React, { useState, useEffect } from 'react';
import axios from 'axios';



const Items = () => {
const [items, setItems] = useState([]);

useEffect(() => {
  axios.get('/items')
  .then((response) => {
    setItems(response.data)
  })
  .catch((error) => {
    console.error(error);
  });
}, []);

return (
  <ul>
    <h1>Items</h1>
    {items.map((item) => (
      <li key={item.id}>
        <a href={`/items/${item.id}`}>item.name</a>
      </li>
    ))}
  </ul>
);

}


export default Items;