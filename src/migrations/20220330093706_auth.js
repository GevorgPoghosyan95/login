/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.up = (knex) => knex.schema.createTable('auth', (t) => {
    t.increments('id').unsigned().primary();
    t.integer('userId').references('id').inTable('users').notNullable()
        .onDelete('CASCADE');
    t.string('scope')
    t.string('accessToken')
    t.string('refreshToken')
    t.dateTime('refreshTokenExpiresAt')
    t.dateTime('accessTokenExpiresAt')
    t.dateTime('created_at').notNullable().defaultTo(knex.fn.now());
    t.dateTime('updated_at').notNullable().defaultTo(knex.fn.now());
});

/**
 * @param { import("knex").Knex } knex
 * @returns {Knex.SchemaBuilder}
 */
exports.down = (knex) => knex.schema.dropTable('auth');
