

//THIS IS MY RESTful API THAT EXPOSES THE ENDPOINTS NEEDED FOR INTERACTING WITH THE DATABASE



const express = require('express');
const knex = require('knex')(require('../knexfile.js')[process.env.NODE_ENV ||"development"])
const port = 3001;
const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors());

//const bcrypt = require("bcryptjs");
const saltRounds = 10;
//const { findUserByUsername } = require('./findUser.js')


//Middleware for posts and patching
app.use(
  cors({
    origin: ['http://localhost:3000', 'http://127.0.0.1:3000'],
  })
);
app.use(express.json());




//POST: REGISTER A NEW USER
  app.post("/register", async (req, res) => {
    const { firstname, lastname, username, password } = await req.body;
    const salt = bcrypt.genSaltSync(10);

    try {
      if (!firstname || !lastname || !username || !password) {
        throw new Error();
      }

      const hash = bcrypt.hashSync(password, salt);
      knex("toy_store")
        .insert({
          firstname: firstname,
          lastname: lastname,
          username: username,
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


//POST: LOG IN EXISTING USER
  app.post("/login", (req, res) => {
    const { username, password } = req.body;
    try {
      knex("toy_store")
        .select("password", "id", "username")
        .where({ username: username })

        .then((dataArray) => {
          console.log(dataArray);
          if (
            dataArray.length === 0 ||
            !bcrypt.compareSync(password, dataArray[0].password)
          ) {
            res.status(200).json("No user found");
          } else {
            req.session.user = {
              id: dataArray[0].id,
              username: dataArray[0].username,
            };

            req.session.save((err) => {
              if (err) {
                console.error("Issue saving session");
                return res.status(500).json({ message: "Express session error" });
              }

              res.status(200).json({
                userAuth: true,
                id: req.session.user.id,
                email: req.session.user.username,
              });
            });
          }
        });
    } catch (error) {
      res.status(500).json({ message: err.message });
    }
  });



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





//
//CRUD FOR ITEMS
//

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


      //GET: logs username and logs/prints specific user info
  app.get('/user/:username', (request, response) => {
    const { username } =req.params;

    knex('toy_store')
    .where({username})
    .first()
    .then(user => {
      if (data) {
        res.status(200).json(data);
      } else {
        res.status(404).json({message: 'User not found'})
      }
    })


    //NOW THAT YOU CAN ISOLATE A MANAGER, YOU MUST BE ABLE TO ISOLATE THE ITEMS THEY CREATED:
    app.get('/items/:userId', (request, response) => {
      const {userId} = request.params;
      knex('item')
      .select('*')
      .where({ userId })
      .then((data) => response.status(200).json(data))
      .catch((err) =>
      res.status(404).json({
        message: "Cannot find items."
         }))
       })
     })
  })



//POST: Create new Items

app.post('/additems', async (req, res) => {
  let newItem = req.body;
  try{
    const [id] = await knex('item').insert(newItem).returning('id');

    res.status(201).json({
      message: "item added",
      item: {...newItem, id}
    });
  } catch (error) {
    console.error("Cannot add item");
  }
}
)

//DELETE: Delete items by ID
app.delete('items/:id', async (req, res) => {
  const { id } = req.params;
  knex('items')
  .where({id})
  .delete()
  .then((data) => {
    if (data > 0) {
      res.status(204).json(data);
    } else {
      res.status(404).json({ message: "Item not found" });
    }
  }). catch ((err) =>
    res.status(500).json({
      message: err,
    })
  );
})

//PATCH: update items
app.patch('/items/:id', async (req, res) => {
  const { id } = req.params;
  const updatedInfo = req.body;
  knex('item')
  .where({ id })
  .update(updatedInfo)
  .then((data) => {
    if (data > 0) {
      res.status(204).json({message: "item not found"});
    }
  })
  .catch((error) =>
  res.status(500).json ({
    message: error,
  })
);
});


app.listen(port, () => {
  console.log('Your Knex and Express applications are running successfully!')
})


module.exports = app;