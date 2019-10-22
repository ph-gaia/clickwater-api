'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FavoriteItemsSchema extends Schema {
  up () {
    this.create('favorite_items', (table) => {
      table.increments()
      table
        .integer('product_id')
        .unsigned()
        .references('id')
        .inTable('products')
        .onUpdate('NO ACTION')
        .onDelete('NO ACTION')
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('NO ACTION')
        .onDelete('NO ACTION')
      table.boolean('is_favorite')
      table.timestamps()
    })
  }

  down () {
    this.drop('favorite_items')
  }
}

module.exports = FavoriteItemsSchema
