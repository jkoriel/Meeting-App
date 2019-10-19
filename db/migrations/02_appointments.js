exports.up = function(knex) {
  return knex.schema.createTable("appointments", function(table) {
    table.increments();
    table.string("title");
    table.string("body");
    table.string("location");
    table.string("time");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("appointments");
};
