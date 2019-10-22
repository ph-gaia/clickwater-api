'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SellerCategorySchema extends Schema {
  up () {
    this.create('seller_categories', (table) => {
      table.increments()
      table.string('name', 80).notNullable()
      table.string('image_url', 100)
      table.timestamps()
    })
  }

  down () {
    this.drop('seller_categories')
  }
}

module.exports = SellerCategorySchema
