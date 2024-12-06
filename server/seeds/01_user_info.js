/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

const bcrypt = require('bcrypt');

exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE toy_store CASCADE')
  await knex('toy_store').del()
  await knex('toy_store').insert([
    {id: 1, firstname: 'Jack', lastname: 'Frost', username: 'JFrost', password: bcrypt.hashSync('DecktheHall$', 10)},
    {id: 2, firstname: 'George', lastname: 'Bailey', username: 'GBailey', password: bcrypt.hashSync('W0nderful-Life', 10)},
    {id: 3, firstname: 'Snoopy', lastname: 'Brown', username: 'SBrown', password: bcrypt.hashSync('Flying@ce', 10)}
  ]);
};
