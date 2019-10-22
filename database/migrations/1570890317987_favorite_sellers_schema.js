'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FavoriteSellersSchema extends Schema {
  up () {
    this.create('favorite_sellers', (table) => {
      table.increments()
      table
        .integer('sellers_id')
        .unsigned()
        .references('id')
        .inTable('sellers')
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
    this.drop('favorite_sellers')
  }
}

module.exports = FavoriteSellersSchema
