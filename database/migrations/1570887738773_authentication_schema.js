'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AuthenticationSchema extends Schema {
  up () {
    this.create('authentications', (table) => {
      table.increments()
      table.string('username', 60).notNullable().unique()
      table.string('password', 60).notNullable()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('NO ACTION')
        .onDelete('NO ACTION')
      table.boolean('active')
      table.timestamps()
    })
  }

  down () {
    this.drop('authentications')
  }
}

module.exports = AuthenticationSchema
