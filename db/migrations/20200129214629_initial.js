
exports.up = function(knex) {
    return knex.schema
    .createTable('characters', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('status');
        table.string('species');
        table.string('type');

        table.timestamps(true, true);
    })
    .createTable('versions', (table) => {
        table.increments('id').primary();
        table.string('name');
        table.string('status');
        table.string('species');
        table.string('type');
        table.integer('characters_id').unsigned()
        table.foreign('characters_id')
            .references('characters.id');

        table.timestamps(true, true);
    })
}

exports.down = function(knex) {
  return knex.schema
    .dropTable('versions')
    .dropTable('characters')
};
