'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class ProductSchema extends Schema {
  up () {
    this.create('products', (table) => {
      table.increments()
      table.string('name', 150).notNullable()
      table.string('description', 200)
      table.string('brand', 100)
      table
        .integer('brand_id')
        .unsigned()
        .references('id')
        .inTable('brands')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('category_id')
        .unsigned()
        .references('id')
        .inTable('product_categories')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.string('addtional_info', 200)
      table.string('url', 300)
      table.string('image_url', 100)
      table.boolean('active')
      table.timestamps()
    })
  }

  down () {
    this.drop('products')
  }
}

module.exports = ProductSchema
