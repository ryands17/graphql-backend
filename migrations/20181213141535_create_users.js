exports.up = (knex, Promise) => {
  return knex.schema.createTable('users', table => {
    table.increments()
    table.string('name').notNullable()
    table.string('email').notNullable()
    table.string('password').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('users')
}
