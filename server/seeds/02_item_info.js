/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE item CASCADE')
  await knex('item').del()
  await knex('item').insert([
    {id: 1, toy_store_id: 2, name: 'Barbie Dreamhouse', description: 'Pretty, pink, sparkly, 10-room dreamhouse!', quantity: 5},
    {id: 2, toy_store_id: 2, name: 'Pokemon Cards', description: '10-card booster packs', quantity: 25},
    {id: 3, toy_store_id: 1, name: 'Furby', description: 'Horrifying and loud.', quantity: 30},
    {id: 4, toy_store_id: 3, name: 'Hot Wheels', description: 'Volkswagon, blue', quantity: 2}
  ]);
};
