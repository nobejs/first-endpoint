exports.up = async function (knex) {
  await knex.raw(`create extension if not exists "uuid-ossp"`);
  return knex.schema.createTable("users", function (table) {
    table
      .uuid("uuid")
      .notNullable()
      .primary()
      .defaultTo(knex.raw("uuid_generate_v4()"));
    table.string("email", 255).notNullable();
    table.string("password", 255).notNullable();
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("teams");
};
