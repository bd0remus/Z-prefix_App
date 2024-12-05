import React, {useState, useEffect} from 'react';

const Home = () => {


    const [items, setItems] = useState([]);
  useEffect(() => {
    fetch('http://localhost:3001/items')
      .then(res => res.json())
      .then((data) => setItems(data));
  }, []);



  return (
  <div className="Home">
  <h1>Welcome to the Home Page.</h1>
  <p>
 app.post('/items', (req, res) => {
    console.log(req.body.email) // "sam@gmail.com"
    console.log(req.body.password) // "chompz4lyfe"
  })
  </p>
  </div>
  )
}

export default Home;