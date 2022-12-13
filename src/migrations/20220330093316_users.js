/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = (knex) => knex.schema.createTable('users', (t) => {
    t.increments('id').unsigned().primary();
    t.string('first_name')
    t.string('last_name')
    t.string('email').notNullable().unique();
    t.string('phone').nullable().unique();
    t.enum('role', ['user', 'driver', 'operator','admin']).notNullable().defaultTo('user');
    t.string('password');
    t.string('provider');
    t.boolean('verified').notNullable().defaultTo(false);
    t.string('otp_code').nullable();
    t.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    t.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
});



/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 *
 */
exports.down = (knex) => knex.schema.dropTable('users');