/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('toy_store', table => {
    table.increments();
    table.string('firstname', 250);
    table.string('lastname', 250);
    table.string('password', 250);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('toy_store');
};
