/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('toy_store', table => {
    table.increments('id').pirmary();
    table.dropUnique();
    table.string('firstname', 250);
    table.string('lastname', 250).notNullable();
    table.string('username', 250).notNullable();
    table.string('password', 250).notNullable();
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropTableIfExists('toy_store');
};
