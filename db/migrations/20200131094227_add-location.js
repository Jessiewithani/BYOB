
exports.up = function(knex) {
  return knex.schema.table('versions', table => {
      table.string('location')
  })
};

exports.down = function(knex) {
  return knex.schema.table('versions', table => {
      table.dropColumn('location')
  })
};
