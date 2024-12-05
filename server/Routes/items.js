const express = require('express')
const router = express.Router();

const knex = require('knex')(require('../knexfile.js')["development"])



// Create new event
router.post('/add-test-item', async (req, res) => {
  try {
    return knex.insert({ id:5, name: 'Polly Pocket', Description: 'Polly', quantity: '18'}).into('items');
    res.status(201).send('item added');
  } catch (error) {
    res.status(500).send('Error adding event');
  }
  });


  router.get('/', async (req, res) => {
    try {
      const items = await knex('items').select('*');
      res.json(items);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch items.' });
    }
  });


  module.exports = router;