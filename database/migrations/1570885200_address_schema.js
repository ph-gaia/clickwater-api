'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AddressSchema extends Schema {
  up () {
    this.create('addresses', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('zip_code', 9).notNullable()
      table.string('address', 100).notNullable()
      table.string('number', 40).notNullable()
      table.string('neighborhood', 40)
      table.string('city', 40)
      table.string('state', 40)
      table.string('gps_lat', 20)
      table.string('gps_long', 20)
      table.boolean('active')
      table.timestamps()
    })
  }

  down () {
    this.drop('addresses')
  }
}

module.exports = AddressSchema
