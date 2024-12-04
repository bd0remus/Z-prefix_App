/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE toy_store CASCADE')
  await knex('toy_store').del()
  await knex('toy_store').insert([
    {id: 1, firstname: 'Jack', lastname: 'Frost', password: 'DecktheHall$'},
    {id: 2, firstname: 'George', lastname: 'Bailey', password: 'W0nderful-Life'},
    {id: 3, firstname: 'Snoopy', lastname: 'Brown', password: 'Flying@ce'}
  ]);
};
