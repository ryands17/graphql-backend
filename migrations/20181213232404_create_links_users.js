exports.up = (knex, Promise) => {
  return knex.schema
    .createTable('users', users => {
      users.increments()
      users.string('name').notNullable()
      users.string('email').notNullable()
      users.string('password').notNullable()
      users.timestamp('created_at').defaultTo(knex.fn.now())
      users.timestamp('updated_at').defaultTo(knex.fn.now())
    })
    .createTable('links', links => {
      links.increments()
      links.string('url').notNullable()
      links.string('description').notNullable()
      links.timestamp('created_at').defaultTo(knex.fn.now())
      links.timestamp('updated_at').defaultTo(knex.fn.now())
      links
        .integer('user_id')
        .references('id')
        .inTable('users')
        .notNullable()
        .onDelete('cascade')
    })
}

exports.down = (knex, Promise) => {
  return knex.schema.dropTable('links').dropTable('users')
}
