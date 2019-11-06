'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class CreditCardsSchema extends Schema {
  up () {
    this.create('credit_cards', (table) => {
      table.increments()
      table
        .integer('user_id')
        .unsigned()
        .references('id')
        .inTable('users')
        .onUpdate('NO ACTION')
        .onDelete('NO ACTION')
      table.string('number', 16).notNullable().unique()
      table.string('enterprise', 20).notNullable()
      table.string('owner_full_name', 60).notNullable()
      table.string('owner_reg_number', 11).notNullable()
      table.integer('expiry_month', 2).notNullable()
      table.integer('expiry_year', 4).notNullable()
      table.string('security_number', 3).notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('credit_cards')
  }
}

module.exports = CreditCardsSchema
