const express = require('express');
const app = express();
const port = 8081;
const cors = require('cors')

const knex = require('knex')(require('../knexfile.js')["development"])

app.use(cors());
app.use(express.json());


// //New user registration
// app.post('/register', async (req, res) => {
//   const { id, firstname, lastname, username, password } = req.body;
//   await knex('toy_store').insert({ id, firstname, lastname, username, password })
//   res.send('User created');
// })

// //Returning User Login
// // app.post('/login', async (req, res) => {
// //   const { username, password } = req.body;
// //   if (toy_store_username === toy_store_password)
// // })

//  app.post('/adduser', (req, res) => {
//     console.log(req.body);
//     res.send("response received: " + req.body);
//   })

//CRUD FOR ITEMS


// GET: Fetch all items (WORKS)
app.get('/', (request, response) => {
    knex('item')
    .select('*')
    .then(items => {
      var itemNames = items.map(item => item.name)
      response.json(itemNames);
    })
  })

//POST: Create new Items

app.post('/add-items', async (req, res) => {
  const { toy_store_id, id, name, description, quantity } = req.body;


  if (!toy_store_id || !id || !name || !description || !quantity) {
    return res.status(400).json({ error: 'All fields are required when creating a new toy.' });
  }

  try {
    const [newItem] = await knex('item')
      .insert({ toy_store_id, id, name, description, quantity })
      .returning('*');
    res.status(201).json(newItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to add toy.' });
  }
});


app.listen(port, () => {
  console.log('Your Knex and Express applications are running successfully!')
})

//make this '/' endpoint so that is shows items on home page
//create a '/myitems' endpoint so that it shows your items

module.exports = app;