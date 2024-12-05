import React, {useState, useEffect} from 'react';

const Home = () => {


    const [items, setItems] = useState([]);
    const [error, setError] = useState([null])
  useEffect(() => {
    fetch("http://localhost:3001/items")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch events");
        }
        return res.json();
      })
      .then((data) => setItems(data))
      .catch((err) => setError(err.message));
  }, []);
  // return (
  //   <h1>Welcome to the Home Page.</h1>
  // )
}

export default Home;