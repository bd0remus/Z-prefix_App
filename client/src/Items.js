import React, { useState, useEffect } from 'react';

const Items = () => {

const [items, setItems] = useState([]);
useEffect(() => {
  fetch('http://localhost:3001/item/:itemId')
    .then(res => res.json())
    .then((data) => setItems(data));
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