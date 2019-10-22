'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductCategorySchema extends Schema {
  up () {
    this.create('product_categories', (table) => {
      table.increments()
      table.string('name', 100).notNullable()
      table.string('description', 200)
      table.integer('parent_category_id')
      table.string('image_url', 100)
      table.integer('sort_order', 4)
      table.boolean('active')
      table.timestamps()
    })
  }

  down () {
    this.drop('product_categories')
  }
}

module.exports = ProductCategorySchema
