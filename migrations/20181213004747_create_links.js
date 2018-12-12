exports.up = (knex, Promise) => {
  return knex.schema.createTable('links', table => {
    table.increments()
    table.string('url').notNullable()
    table.string('description').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.timestamp('updated_at').defaultTo(knex.fn.now())
  })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('links')
}
