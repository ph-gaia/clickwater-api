'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class OrdersSchema extends Schema {
  up () {
    this.create('orders', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('seller_id')
        .unsigned()
        .references('id')
        .inTable('sellers')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('address_id')
        .unsigned()
        .references('id')
        .inTable('addresses')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('status_id')
        .unsigned()
        .references('id')
        .inTable('order_status')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.float('delivery_tax')
      table.float('not_available_amount')
      table.float('total_amount')
      table.float('amount_payable')
      table.datetime('requested_delivery_time')
      table.datetime('accepted_delivery_time')
      table.datetime('started_delivery_time')
      table.datetime('finished_delivery_time')
      table.datetime('date_modifed')
    })
  }

  down () {
    this.drop('orders')
  }
}

module.exports = OrdersSchema
