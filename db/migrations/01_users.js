exports.up = function(knex) {
  return knex.schema.createTable("users", function(table) {
    table.increments();
    table.string("name");
    table.string("company");
    table.string("email");
    table.string("phone");
    table.string("address");
    table.string("password");
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("users");
};
