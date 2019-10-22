'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrderStatusSchema extends Schema {
  up () {
    this.create('order_status', (table) => {
      table.increments()
      table.string('name', 150).notNullable()
      table.boolean('active')
      table.timestamps()
    })
  }

  down () {
    this.drop('order_status')
  }
}

module.exports = OrderStatusSchema
