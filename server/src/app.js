const express = require('express');
const app = express();
const port = 8080;

const knex = require('knex')(require('../knexfile.js')["development"])

app.get('/', (request, response) => {
  response.send('Application up and running.')
})

app.listen(port, () => {
  console.log('Your Knex and Express application are running successfully.')
})

app.get('/items', (request, response) => {
    knex('item')
    .select('*')
    .then(items => {
      var itemNames = items.map(item => item.name)
      response.json(itemNames);
    })
})