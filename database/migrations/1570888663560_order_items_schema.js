'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderItemsSchema extends Schema {
  up () {
    this.create('order_items', (table) => {
      table.increments()
      table
        .integer('order_id')
        .unsigned()
        .references('id')
        .inTable('orders')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('NO ACTION')
        .onDelete('NO ACTION')
      table.string('name', 150).notNullable()
      table.string('brand', 150).notNullable()
      table.float('price')
      table.float('discount')
      table.float('quantity')
      table.integer('order_count')
      table.timestamps()
    })
  }

  down () {
    this.drop('order_items')
  }
}

module.exports = OrderItemsSchema
