const express = require('express');
const app = express();
const port = 8081;


const knex = require('knex')(require('../knexfile.js')["development"])

// GET: Fetch all items
app.get('/', (request, response) => {
    knex('item')
    .select('*')
    .then(items => {
      var itemNames = items.map(item => item.name)
      response.json(itemNames);
    })
  })


app.listen(port, () => {
  console.log('Your Knex and Express application are running successfully.')
})

//make this '/' endpoint so that is shows items on home page
//create a '/myitems' endpoint so that it shows your items

