exports.up = function(knex) {
  return knex.schema.createTable("appointments", function(table) {
    table.increments();
    table.string("title").notNullable();
    table.string("body").notNullable();
    table.string("location").notNullable();
    table.boolean("completed");
    table.timestamps(true, true);
    table
      .integer("user_id")
      .references("id")
      .inTable("users");
    table
      .integer("guest_id")
      .references("id")
      .inTable("users");
  });
};

exports.down = function(knex, Promise) {};
