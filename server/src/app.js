const express = require('express');
const knex = require('knex')(require('../knexfile.js')["development"])
const port = 3001;

const app = express();
app.use(express.json());

const cors = require('cors')
app.use(cors());
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  })
);
app.use(express.json());








//New user registration
app.post('/register', async (req, res) => {
  try{
  const { firstname, lastname, username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = await knex('toy_store').insert({ firstname, lastname, username, password: hashedPassword })
  res.json({message: 'Account created successfully'})
} catch (error){
  res.status(500).json({message: 'Failed to create user'})
}
});

//Returning User Login
app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await knex('toy_store').where({ username });
    if (!user){
      return res.status(401).json({message: 'Invalid username or password'})
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(401).json({message: 'Invalid username or password'})
    }
  } catch(error){
    res.status(500).json({message: 'Unable to log in.'})
  }

})


//CRUD FOR ITEMS


// GET: Fetch all items (WORKS!!)
app.get('/item', (request, response) => {
    knex('item')
    .select('*')
    .then(items => {
      var itemNames = items.map(item => item.name)
      response.json(itemNames);
    })
  })
//GET: logs inputted item ID and logs/prints specific item info (WORKS!!)
  app.get('/item/:itemId', (request, response) => {
    knex('item')
    .select('*')
    .then(items => {
      var {itemId} = request.params;
      console.log(`here is my item id:  ${itemId}`)
      let myItem = items.find(element => {
        console.log(element.id, parseInt(itemId))
        return element.id === parseInt(itemId) })
         console.log(`here is my item:`, myItem)
         response.status(200).send(myItem);
    })
  })

  //GET: All items of a toy_store_id
  



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

// //PUT: Update an Item

// server.put('/:id', async (req, res) => {
//   const {id} = req.params;
//   const { toy_store_id, id, name, description, quantity } = req.body;

//   if(!toy_store_id || !id || !name || !description || !quantity) {
//      return res.status(400).json({ error: 'All fields are required.' });
//   }

//   try{
//     const updatedCount = await knex('events').where({id}).update({
//       name,
//       location,
//       date,
//       time
//     });

//   if (!updatedCount) {
//     return res.status(404).json({ error: 'Event does not exist.'})
//   }

//   const updatedEvent = await knex('events').where({id}).first();
//   res.json(updatedEvent);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: 'Failed to update event.' });
//   }
// })

app.delete('items/:id', async (req, res) => {
  try {
    await knex('item').where({ id: req.params.id }).del();
    res.json({message: 'Item deleted successfully'})
  } catch(error){
    res.status(500).json({ message: 'Item failed to delete.'})
  }
})


app.listen(port, () => {
  console.log('Your Knex and Express applications are running successfully!')
})


module.exports = app;