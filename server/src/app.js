const express = require('express');
const knex = require('knex')(require('../knexfile.js')["development"])
const port = 4000;

const app = express();
app.use(express.json());

const cors = require('cors')
// app.use(cors());
// app.use(
//   cors({
//     origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
//   })
// );

//New user registration
app.post('/register', async (req, res) => {
  const { id, firstname, lastname, username, password } = req.body;
  try{
  const user = await knex('toy_store').insert({ id, firstname, lastname, username, password })
} catch (error){
  res.status(500).json({message: 'Failed to create user'})
}
  res.send('User created');
});

//Returning User Login
app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await knex('toy_store').where({ username });
    if (!user){
      return res.status(401).json({message: 'Invalid username or password'})
    }
    const validPassword = await knex('toy_store_password').compare(password);
    if (!validPassword) {
      return res.status(401).json({message: 'Invalid username or password'})
    }
  } catch(error){
    res.status(500).json({message: 'Unable to log in.'})
  }

})


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

app.post('/additems', async (req, res) => {
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


module.exports = app;