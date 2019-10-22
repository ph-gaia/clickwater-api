'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class BrandSchema extends Schema {
  up () {
    this.create('brands', (table) => {
      table.increments()
      table.string('name', 150).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('brands')
  }
}

module.exports = BrandSchema
