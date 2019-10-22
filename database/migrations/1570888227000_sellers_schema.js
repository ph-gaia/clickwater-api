'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SellersSchema extends Schema {
  up () {
    this.create('sellers', (table) => {
      table.increments()
      table.string('name', 80).notNullable().unique()
      table.string('image_url', 100)
      table.string('header_image', 100)
      table.time('open_time')
      table.time('close_time')
      table.boolean('pickup_from_shop')
      table.boolean('home_delivery')
      table.float('max_delivery_distance')
      table.float('min_order')
      table.float('delivery_charges')
      table.time('delivery_start_time')
      table.time('delivery_end_time')      
      table.boolean('active')
      table
        .integer('address_id')
        .unsigned()
        .references('id')
        .inTable('addresses')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('CASCADE')
        .onDelete('CASCADE')
      table.timestamps()
    })
  }

  down () {
    this.drop('sellers')
  }
}

module.exports = SellersSchema
