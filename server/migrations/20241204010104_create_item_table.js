/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema.createTable('item', table => {
    table.increments();
    table.integer('toy_store_id');
    table.string('name', 250);
    table.string('description', 100);
    table.integer('quantity');
    table.foreign('toy_store_id').references('toy_store.id')
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.alterTable('item', table => {
    table.dropForeign('toy_store_id')
  })
  .then(function() {
    return knex.schema.dropTableIfExists('item');
  });
};
