import React, {useState, useEffect} from 'react';

const Home = () => {


    const [items, setItems] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/item')
      .then(res => res.json())
      .then((data) => setItems(data));
      }, []);


  return (
  <div className="Home">
  <h1>Welcome to the Home Page!</h1>
  <a href="http://localhost:3001/login">Log in or Register</a>
  <ul>
    {items.map((item) => (
      <div key ={item.id}>
         {[ <li>Inventory Manager ID: <strong>{item.toy_store_id}</strong></li>, <li>Toy Name: <strong>{item.name}</strong></li>, <li>Description: <strong>{item.description}</strong></li>, <li>Quantity: <strong>{item.quantity}</strong></li> ]}
         <br/>
      </div>
    ))}

  </ul>
  </div>
  )
}

export default Home;