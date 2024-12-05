

//THIS IS MY RESTful API THAT EXPOSES THE ENDPOINTS NEEDED FOR INTERACTING WITH THE DATABASE




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
      var itemNames = items.map(item => item)
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

  //GET: logs inputted user ID and logs/prints specific user info (WORKS!!)
  app.get('/user-items/:userId', (request, response) => {
    knex('toy_store')
    .select('*')
    .then(user => {
      var {userId} = request.params;
      console.log(`here is my user id:  ${userId}`)
     let thisUser = user.find(element => {
      console.log(element.id, parseInt(userId))
      return element.id === parseInt(userId) })
     console.log("here is this user", thisUser)
      response.status(200).send(thisUser);


    //NOW THAT YOU CAN ISOLATE A MANAGER, YOU MUST BE ABLE TO ISOLATE THE ITEMS THEY CREATED:
    // knex('item')
    // .select('*')
    // .then(items => {
    //   var {itemId} = request.params;
    //   let myItem = items.find(element => {
    //     console.log(element.id, parseInt(itemId))
    //   })
    //   if(userId === itemId){
    //     console.log(myItem)
    //   }
    //    })
     })
  })






  const express = require("express");
  const router = express.Router();
  const bcrypt = require("bcryptjs");

  const knex = require("knex")(require("./knexfile")["development"]);

  router.get("/", (req, res) => {
    res.status(200).json("Made it to the homepage");
  });

  router.post("/create", async (req, res) => {
    const { firstname, lastname, email, password } = await req.body;
    const salt = bcrypt.genSaltSync(10);

    try {
      if (!firstname || !lastname || !email || !password) {
        throw new Error();
      }

      const hash = bcrypt.hashSync(password, salt);
      knex("users")
        .insert({
          firstname: firstname,
          lastname: lastname,
          email: email,
          password: hash,
        })
        .then(() => res.status(201).json({ accountCreated: true }));
    } catch (err) {
      res.status(500).json({
        accountCreated: false,
        message: err.message,
      });
    }
  });











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